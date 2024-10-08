
import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import CustomerListView from './screens/CustomerListView';
import CustomerFormView from './screens/CustomerFormView';
import CustomerView from './screens/CustomerView';
import ProjectListView from './screens/ProjectListView';
import ProjectFormView from './screens/ProjectFormView';
import ProjectView from './screens/ProjectView';
import ProjectDownloadingFormView from './screens/ProjectDownloadingFormView';

function App() {
  const location = useLocation();
  const selectedKey = location.pathname.startsWith('/projects') ? '2' : '1';
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/projects">Projects</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Navigate to="/customers" replace />} />

            <Route path="/customers" element={<CustomerListView />} />
            <Route path="/customers/add" element={<CustomerFormView />} />
            <Route path="/customers/edit/:id" element={<CustomerFormView />} />
            <Route path="/customers/view/:id" element={<CustomerView />} />

            <Route path="/projects" element={<ProjectListView />} />
            <Route path="/projects/add" element={<ProjectFormView />} />
            <Route path="/projects/edit/:id" element={<ProjectFormView />} />
            <Route path="/projects/view/:id" element={<ProjectView />} />

            <Route path="/projects/download/" element={<ProjectDownloadingFormView />} />

          </Routes>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Customer Management System ©2024</Footer> */}
    </Layout>
  );
}

export default App;
