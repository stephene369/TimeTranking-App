import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Tabs,
  Button,
  Space,
  Tooltip,
  Divider,
  Calendar,
  Badge,
  Alert
} from 'antd';
import {
  SyncOutlined,
  HistoryOutlined,
  PieChartOutlined,
  CalendarOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import { useTimer } from '../../context/TimerContext';
import Timer from '../../components/timeTracker/Timer';
import TimeStatistics from '../../components/timeTracker/TimeStatistics';
import TimeEntryList from '../../components/timeTracker/TimeEntryList';
import TimeEntryModal from '../../components/timeTracker/TimeEntryModal';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TimeTracker = () => {
  const {
    timeEntries,
    loading,
    error,
    syncLocalEntries,
    refreshEntries
  } = useTimer();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Afficher le modal pour ajouter une entrée
  const showAddModal = () => {
    setEditingEntry(null);
    setIsModalVisible(true);
  };

  // Afficher le modal pour éditer une entrée
  const showEditModal = (entry) => {
    setEditingEntry(entry);
    setIsModalVisible(true);
  };

  // Fermer le modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingEntry(null);
  };

  // Rendu des cellules du calendrier
  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const entriesForDate = timeEntries.filter(entry => entry.date === dateStr);

    if (entriesForDate.length === 0) {
      return null;
    }

    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {entriesForDate.slice(0, 2).map((entry, index) => (
          <li key={index}>
            <Badge
              status={entry._isLocalOnly ? "warning" : "processing"}
              text={<Text ellipsis style={{ fontSize: '12px' }}>{entry.activity} ({entry.duration})</Text>}
            />
          </li>
        ))}
        {entriesForDate.length > 2 && (
          <li>
            <Text type="secondary" style={{ fontSize: '12px' }}>+{entriesForDate.length - 2} more</Text>
          </li>
        )}
      </ul>
    );
  };

  // Vérifier s'il y a des entrées locales uniquement
  const hasLocalOnlyEntries = timeEntries.some(entry => entry._isLocalOnly);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* <Col span={24}>
          <Card>
            <Title level={4}>Time Tracker</Title>
            <Text>Track and manage your study and activity time.</Text>

            {error && (
              <Alert
                message="Connection Error"
                description={error}
                type="warning"
                showIcon
                style={{ marginTop: 16 }}
                action={
                  <Button size="small" type="primary" onClick={refreshEntries}>
                    Retry
                  </Button>
                }
              />
            )}

            {hasLocalOnlyEntries && (
              <Alert
                message="Unsynchronized Entries"
                description="You have time entries that haven't been saved to the server. Click 'Sync Now' to upload them."
                type="info"
                showIcon
                style={{ marginTop: 16 }}
                action={
                  <Button
                    size="small"
                    type="primary"
                    icon={<CloudUploadOutlined />}
                    onClick={syncLocalEntries}
                  >
                    Sync Now
                  </Button>
                }
              />
            )}
          </Card>
        </Col> */}

        {/* Timer Section */}
        <Col xs={24} lg={12}>
          <Timer onAddManually={showAddModal} />
        </Col>

        {/* Stats Section */}
        <Col xs={24} lg={12}>
          <TimeStatistics />
        </Col>

        {/* Time Entries Tab Section */}
        <Col span={24}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Title level={5} style={{ margin: 0 }}>Time Entries</Title>
              <Space>
                {loading ? (
                  <Button icon={<SyncOutlined spin />} disabled>
                    Loading...
                  </Button>
                ) : (
                  <Tooltip title="Refresh Entries">
                    <Button icon={<SyncOutlined />} onClick={refreshEntries}>
                      Refresh
                    </Button>
                  </Tooltip>
                )}
              </Space>
            </div>

            <Divider style={{ margin: '0 0 16px 0' }} />

            <Tabs defaultActiveKey="list">
              <TabPane
                tab={<span><HistoryOutlined /> Time Entries</span>}
                key="list"
              >
                <TimeEntryList onEdit={showEditModal} onAdd={showAddModal} />
              </TabPane>

              <TabPane
                tab={<span><PieChartOutlined /> Analytics</span>}
                key="analytics"
              >
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Title level={4}>Time Analytics Coming Soon</Title>
                  <Text>
                    Detailed charts and analytics will be available in a future update.
                  </Text>
                </div>
              </TabPane>

              <TabPane
                tab={<span><CalendarOutlined /> Calendar View</span>}
                key="calendar"
              >
                <Calendar
                  dateCellRender={dateCellRender}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Modal pour ajouter/éditer une entrée */}
      <TimeEntryModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        editingEntry={editingEntry}
      />
    </div>
  );
};

export default TimeTracker;

