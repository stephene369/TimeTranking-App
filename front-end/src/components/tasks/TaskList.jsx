import React from 'react';
import { Table, Tag, Space, Button, Tooltip, Checkbox, Typography, Progress } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTask } from '../../context/TaskContext';
import dayjs from 'dayjs';

const { Text } = Typography;
// Données pour les priorités
const priorities = [
    { value: 'high', label: 'High', color: 'red' },
    { value: 'medium', label: 'Medium', color: 'orange' },
    { value: 'low', label: 'Low', color: 'green' },
];

// Données pour les catégories
const categories = [
    'Homework',
    'Reading',
    'Study',
    'Project',
    'Exam',
    'Other'
];

const TaskList = ({ onEdit, filteredTasks }) => {
    const { toggleTaskCompletion, deleteTask } = useTask();

    // Obtenir la couleur de la priorité
    const getPriorityColor = (priority) => {
        const priorityObj = priorities.find(p => p.value === priority);
        return priorityObj ? priorityObj.color : 'default';
    };

    // Obtenir le libellé de la priorité
    const getPriorityLabel = (priority) => {
        const priorityObj = priorities.find(p => p.value === priority);
        return priorityObj ? priorityObj.label : 'Unknown';
    };

    // Colonnes du tableau
    const columns = [
        {
            title: 'Status',
            dataIndex: 'completed',
            key: 'completed',
            render: (completed, record) => (
                <Checkbox
                    checked={completed}
                    onChange={() => toggleTaskCompletion(record.id)}
                />
            ),
            width: 80,
        },
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div>
                    <Text
                        style={{
                            textDecoration: record.completed ? 'line-through' : 'none',
                            opacity: record.completed ? 0.5 : 1,
                        }}
                        strong
                    >
                        {text}
                    </Text>
                    {record.description && (
                        <div>
                            <Text
                                type="secondary"
                                ellipsis={{ rows: 1 }}
                                style={{
                                    opacity: record.completed ? 0.5 : 1,
                                }}
                            >
                                {record.description}
                            </Text>
                        </div>
                    )}
                    {record.subtasks && record.subtasks.length > 0 && (
                        <div style={{ marginTop: 4 }}>
                            <Progress
                                percent={Math.round(
                                    (record.subtasks.filter(st => st.completed).length / record.subtasks.length) * 100
                                )}
                                size="small"
                                format={() => `${record.subtasks.filter(st => st.completed).length}/${record.subtasks.length}`}
                            />
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (dueDate) => {
                if (!dueDate) return <Text type="secondary">No date</Text>;

                const isOverdue = dayjs(dueDate).isBefore(dayjs(), 'day');
                const isToday = dueDate === dayjs().format('YYYY-MM-DD');

                return (
                    <Text
                        type={isOverdue ? 'danger' : isToday ? 'warning' : 'secondary'}
                        strong={isOverdue || isToday}
                    >
                        {isToday ? 'Today' : dayjs(dueDate).format('MMM D, YYYY')}
                    </Text>
                );
            },
            sorter: (a, b) => {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix();
            },
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: priority => (
                <Tag color={getPriorityColor(priority)}>
                    {getPriorityLabel(priority)}
                </Tag>
            ),
            filters: priorities.map(priority => ({ text: priority.label, value: priority.value })),
            onFilter: (value, record) => record.priority === value,
            width: 100,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: category => <Tag>{category}</Tag>,
            filters: categories.map(category => ({ text: category, value: category })),
            onFilter: (value, record) => record.category === value,
            width: 120,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            icon={<DeleteOutlined />}
                            size="small"
                            danger
                            onClick={() => deleteTask(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
            width: 120,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={filteredTasks}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default TaskList;
