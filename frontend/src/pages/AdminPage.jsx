import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getAllUsers, deleteUser, updateUser, createUser } from "../lib/adminApi";
import PageLoader from "../components/PageLoader";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs";
import {
  ShieldIcon,
  UsersIcon,
  TrendingUpIcon,
  BarChart3Icon,
  UserPlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  SettingsIcon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CrownIcon,
  MailIcon,
  UserIcon,
  LockIcon
} from "lucide-react";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    isAdmin: false,
    isOnboarded: false
  });

  // Mock analytics data (in real app, this would come from API)
  const [analytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalCalls: 0,
    callsToday: 0,
    avgCallDuration: '12:34',
    systemHealth: 98.5,
    serverUptime: '99.9%'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.users);

      // Update analytics
      analytics.totalUsers = response.users.length;
      analytics.activeUsers = response.users.filter(user => user.isOnboarded).length;
      analytics.newUsersToday = response.users.filter(user => {
        const today = new Date().toDateString();
        return new Date(user.createdAt).toDateString() === today;
      }).length;

    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      fullName: user.fullName || "",
      isAdmin: user.isAdmin || false,
      isOnboarded: user.isOnboarded || false
    });
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
        console.error(error);
      }
    }
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
    setEditingUser(null);
    setFormData({
      username: "",
      email: "",
      fullName: "",
      password: "",
      isAdmin: false,
      isOnboarded: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        await updateUser(editingUser._id, formData);
        toast.success("User updated successfully");
      } else {
        await createUser(formData);
        toast.success("User created successfully");
      }
      
      setEditingUser(null);
      setIsAddingUser(false);
      fetchUsers();
    } catch (error) {
      toast.error(editingUser ? "Failed to update user" : "Failed to create user");
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setIsAddingUser(false);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Professional Admin Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <ShieldIcon className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display text-gradient-primary">
                Admin Dashboard
              </h1>
              <p className="text-neutral-600">
                Manage users, monitor system health, and view analytics
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            icon={SettingsIcon}
            size="sm"
          >
            Settings
          </Button>
          <Button
            variant="primary"
            icon={UserPlusIcon}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Professional Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Trigger value="overview">
            <BarChart3Icon className="size-4 mr-2" />
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger value="users">
            <UsersIcon className="size-4 mr-2" />
            Users
          </Tabs.Trigger>
          <Tabs.Trigger value="analytics">
            <TrendingUpIcon className="size-4 mr-2" />
            Analytics
          </Tabs.Trigger>
          <Tabs.Trigger value="system">
            <ActivityIcon className="size-4 mr-2" />
            System
          </Tabs.Trigger>
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Content value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <Card variant="gradient" className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <UsersIcon className="size-8 text-primary-600" />
                <span className="text-3xl font-bold text-primary-700">{analytics.totalUsers}</span>
              </div>
              <p className="text-sm text-neutral-600 font-medium">Total Users</p>
              <p className="text-xs text-neutral-500 mt-1">+{analytics.newUsersToday} today</p>
            </Card>

            <Card variant="gradient" className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <CheckCircleIcon className="size-8 text-success" />
                <span className="text-3xl font-bold text-success">{analytics.activeUsers}</span>
              </div>
              <p className="text-sm text-neutral-600 font-medium">Active Users</p>
              <p className="text-xs text-neutral-500 mt-1">Onboarded & Active</p>
            </Card>

            <Card variant="gradient" className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <ActivityIcon className="size-8 text-secondary-600" />
                <span className="text-3xl font-bold text-secondary-700">{analytics.totalCalls}</span>
              </div>
              <p className="text-sm text-neutral-600 font-medium">Total Calls</p>
              <p className="text-xs text-neutral-500 mt-1">{analytics.callsToday} today</p>
            </Card>

            <Card variant="gradient" className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <TrendingUpIcon className="size-8 text-accent-600" />
                <span className="text-3xl font-bold text-accent-700">{analytics.systemHealth}%</span>
              </div>
              <p className="text-sm text-neutral-600 font-medium">System Health</p>
              <p className="text-xs text-neutral-500 mt-1">{analytics.serverUptime} uptime</p>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <Card.Header>
              <Card.Title>Recent Activity</Card.Title>
              <Card.Description>Latest system events and user activities</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {[
                  { type: 'user', message: 'New user registered', time: '2 minutes ago', status: 'success' },
                  { type: 'call', message: 'Video call completed', time: '5 minutes ago', status: 'info' },
                  { type: 'system', message: 'System backup completed', time: '1 hour ago', status: 'success' },
                  { type: 'warning', message: 'High CPU usage detected', time: '2 hours ago', status: 'warning' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-base-200/50 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning' : 'bg-info'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-base-content">{activity.message}</p>
                      <p className="text-sm text-neutral-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </Tabs.Content>

        {/* Users Tab */}
        <Tabs.Content value="users">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>User Management</Card.Title>
                  <Card.Description>Manage user accounts and permissions</Card.Description>
                </div>
                <Button
                  variant="primary"
                  icon={UserPlusIcon}
                  onClick={handleAddUser}
                >
                  Add User
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-base-300">
                      <th className="text-left p-4 font-semibold">User</th>
                      <th className="text-left p-4 font-semibold">Email</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Role</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b border-base-200 hover:bg-base-100">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                              <UserIcon className="size-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold">{user.fullName || user.username}</p>
                              <p className="text-sm text-neutral-500">@{user.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-neutral-600">{user.email}</td>
                        <td className="p-4">
                          {user.isOnboarded ? (
                            <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          {user.isAdmin ? (
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1">
                              <CrownIcon className="size-3" />
                              Admin
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-neutral/10 text-neutral rounded-full text-sm font-medium">
                              User
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={EyeIcon}
                              onClick={() => setSelectedUser(user)}
                            >
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={EditIcon}
                              onClick={() => handleEditUser(user)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={TrashIcon}
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-error hover:text-error"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        </Tabs.Content>

        {/* Analytics Tab */}
        <Tabs.Content value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <Card.Header>
                <Card.Title>User Growth</Card.Title>
                <Card.Description>User registration trends over time</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="h-64 flex items-center justify-center bg-base-200/50 rounded-xl">
                  <p className="text-neutral-500">Chart placeholder - User Growth</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Call Statistics</Card.Title>
                <Card.Description>Video call usage and quality metrics</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="h-64 flex items-center justify-center bg-base-200/50 rounded-xl">
                  <p className="text-neutral-500">Chart placeholder - Call Stats</p>
                </div>
              </Card.Content>
            </Card>
          </div>
        </Tabs.Content>

        {/* System Tab */}
        <Tabs.Content value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <Card.Header>
                <Card.Title>System Health</Card.Title>
                <Card.Description>Monitor system performance and status</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-xl">
                    <span className="font-medium">Server Status</span>
                    <span className="text-success font-semibold">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-xl">
                    <span className="font-medium">CPU Usage</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-xl">
                    <span className="font-medium">Memory Usage</span>
                    <span className="font-semibold">62%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-xl">
                    <span className="font-medium">Disk Usage</span>
                    <span className="font-semibold">38%</span>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>System Logs</Card.Title>
                <Card.Description>Recent system events and errors</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    { level: 'info', message: 'User authentication successful', time: '10:30 AM' },
                    { level: 'warning', message: 'High memory usage detected', time: '10:25 AM' },
                    { level: 'info', message: 'Database backup completed', time: '10:00 AM' },
                    { level: 'error', message: 'Failed to connect to external API', time: '09:45 AM' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        log.level === 'error' ? 'bg-error' :
                        log.level === 'warning' ? 'bg-warning' : 'bg-info'
                      }`}></div>
                      <span className="flex-1">{log.message}</span>
                      <span className="text-neutral-500">{log.time}</span>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>
        </Tabs.Content>
      </Tabs>

      {/* User Edit/Add Modal */}
      <Modal isOpen={editingUser || isAddingUser} onClose={cancelEdit} size="lg">
        <Modal.Header>
          <Modal.Title>
            {editingUser ? 'Edit User' : 'Add New User'}
          </Modal.Title>
          <Modal.Description>
            {editingUser ? 'Update user information and permissions' : 'Create a new user account'}
          </Modal.Description>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                leftIcon={UserIcon}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                leftIcon={MailIcon}
                required
              />

              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                leftIcon={UserIcon}
              />

              {isAddingUser && (
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  leftIcon={LockIcon}
                  required
                />
              )}

              <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl">
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleInputChange}
                  className="checkbox checkbox-primary"
                />
                <div>
                  <label className="font-medium">Admin Privileges</label>
                  <p className="text-sm text-neutral-500">Grant administrative access</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl">
                <input
                  type="checkbox"
                  name="isOnboarded"
                  checked={formData.isOnboarded}
                  onChange={handleInputChange}
                  className="checkbox checkbox-primary"
                />
                <div>
                  <label className="font-medium">Onboarded Status</label>
                  <p className="text-sm text-neutral-500">Mark as completed onboarding</p>
                </div>
              </div>
            </div>
          </Modal.Content>

          <Modal.Footer>
            <Button
              type="button"
              variant="ghost"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {editingUser ? 'Update User' : 'Create User'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* User Details Modal */}
      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} size="md">
        {selectedUser && (
          <>
            <Modal.Header>
              <Modal.Title>User Details</Modal.Title>
              <Modal.Description>
                View detailed information about {selectedUser.fullName || selectedUser.username}
              </Modal.Description>
            </Modal.Header>

            <Modal.Content>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <UserIcon className="size-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedUser.fullName || selectedUser.username}</h3>
                    <p className="text-neutral-500">@{selectedUser.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-500">Email</label>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-500">Role</label>
                    <p className="font-medium">{selectedUser.isAdmin ? 'Administrator' : 'User'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-500">Status</label>
                    <p className="font-medium">{selectedUser.isOnboarded ? 'Active' : 'Pending'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-500">Joined</label>
                    <p className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Modal.Content>

            <Modal.Footer>
              <Button
                variant="ghost"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                icon={EditIcon}
                onClick={() => {
                  setSelectedUser(null);
                  handleEditUser(selectedUser);
                }}
              >
                Edit User
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminPage;
