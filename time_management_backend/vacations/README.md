- `period_start`: Start of accrual period
- `period_end`: End of accrual period

## API Endpoints

### Vacation Types

- `GET /api/vacations/types/` - List all vacation types
- `POST /api/vacations/types/` - Create a new vacation type (HR/Admin only)
- `GET /api/vacations/types/{id}/` - Get vacation type details
- `PUT /api/vacations/types/{id}/` - Update a vacation type (HR/Admin only)
- `DELETE /api/vacations/types/{id}/` - Delete a vacation type (HR/Admin only)

### Vacation Policies

- `GET /api/vacations/policies/` - List all vacation policies
- `POST /api/vacations/policies/` - Create a new vacation policy (HR/Admin only)
- `GET /api/vacations/policies/{id}/` - Get vacation policy details
- `PUT /api/vacations/policies/{id}/` - Update a vacation policy (HR/Admin only)
- `DELETE /api/vacations/policies/{id}/` - Delete a vacation policy (HR/Admin only)

### Vacation Balances

- `GET /api/vacations/balance/` - List vacation balances (filtered by permissions)
- `GET /api/vacations/balance/{id}/` - Get balance details
- `PUT /api/vacations/balance/{id}/` - Update a balance (HR/Admin only)
- `GET /api/vacations/balance/my_balances/` - Get current user's balances

### Vacation Requests

- `GET /api/vacations/requests/` - List vacation requests (filtered by permissions)
- `POST /api/vacations/requests/` - Create a new vacation request
- `GET /api/vacations/requests/{id}/` - Get request details
- `PUT /api/vacations/requests/{id}/` - Update a request (owner only, if pending)
- `DELETE /api/vacations/requests/{id}/` - Delete a request (owner only, if pending)
- `GET /api/vacations/requests/my_requests/` - Get current user's requests
- `GET /api/vacations/requests/pending_approvals/` - Get requests pending approval (managers/HR/Admin)
- `POST /api/vacations/requests/{id}/approve/` - Approve a request (managers/HR/Admin)
- `POST /api/vacations/requests/{id}/reject/` - Reject a request (managers/HR/Admin)
- `POST /api/vacations/requests/{id}/cancel/` - Cancel a request (owner/Admin)

### Vacation Adjustments

- `GET /api/vacations/adjustments/` - List vacation adjustments (HR/Admin only)
- `POST /api/vacations/adjustments/` - Create a new adjustment (HR/Admin only)
- `GET /api/vacations/adjustments/{id}/` - Get adjustment details (HR/Admin only)

### Vacation Accruals

- `GET /api/vacations/accruals/` - List vacation accruals (HR/Admin only)
- `POST /api/vacations/accruals/` - Create a new accrual (HR/Admin only)
- `GET /api/vacations/accruals/{id}/` - Get accrual details (HR/Admin only)

### Vacation Calendar

- `GET /api/vacations/calendar/` - Get vacation calendar data
  - Query parameters:
    - `start_date`: Start date for calendar view (YYYY-MM-DD)
    - `end_date`: End date for calendar view (YYYY-MM-DD)
    - `user_id`: Filter by user (optional)
    - `department_id`: Filter by department (optional)

## Permissions

The module implements custom permissions to ensure users can only access data they're authorized to see:

- **IsHROrAdmin**: Allows HR staff or admins to access sensitive data
- **IsManagerOrHROrAdmin**: Allows managers, HR staff, or admins to access team data
- **IsOwnerOrManagerOrHROrAdmin**: Allows owners, their managers, HR staff, or admins to access personal data

## Workflow

### Vacation Request Workflow

1. User submits a vacation request
2. System checks for overlapping requests and sufficient balance
3. If the vacation type requires approval:
   - Request status is set to "pending"
   - Manager receives notification
   - Manager approves or rejects the request
   - If approved, the balance is updated
4. If the vacation type doesn't require approval:
   - Request is automatically approved
   - Balance is updated immediately

### Accrual Workflow

1. Accruals are processed automatically based on policy settings
2. For each eligible user:
   - System calculates accrual amount based on policy
   - System creates an accrual record
   - System updates the user's balance

## Usage Examples

### Submitting a Vacation Request

```
POST /api/vacations/requests/
{
    "vacation_type": 1,
    "start_date": "2023-07-10",
    "end_date": "2023-07-14",
    "start_half_day": false,
    "end_half_day": false,
    "hours_requested": 40,
    "reason": "Summer vacation"
}
```

### Approving a Request

```
POST /api/vacations/requests/5/approve/
{
    "notes": "Approved. Enjoy your vacation!"
}
```

### Rejecting a Request

```
POST /api/vacations/requests/6/reject/
{
    "notes": "Sorry, we need you for the project deadline."
}
```

### Making a Balance Adjustment

```
POST /api/vacations/adjustments/
{
    "user": 3,
    "vacation_type": 1,
    "hours": 8,
    "reason": "Additional day granted for exceptional performance"
}
```

### Viewing Calendar Data

```
GET /api/vacations/calendar/?start_date=2023-06-01&end_date=2023-06-30
```

## Integration with Other Modules

- **Users & Teams**: Uses user and department data for permissions and filtering
- **Notifications**: Sends notifications for request submissions, approvals, rejections
- **Dashboard**: Provides vacation data for dashboard widgets
- **Reports**: Supplies data for absence reports
