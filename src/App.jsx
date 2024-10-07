
import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import CustomerList from './screens/CustomerList';
import CustomerForm from './screens/CustomerForm';
import CustomerView from './screens/CustomerView';
import ProjectList from './screens/ProjectList';
import ProjectForm from './screens/ProjectForm';
import ProjectView from './screens/ProjectView';
import ProjectDownloadingForm from './screens/ProjectDownloadingForm';

function App() {
  const location = useLocation();
  const selectedKey = location.pathname.startsWith('/Project') ? '2' : '1';
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/Customer">Customers</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/Project">Projects</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/Customer" element={<CustomerList />} />
            <Route path="/Customer/add" element={<CustomerForm />} />
            <Route path="/Customer/edit/:id" element={<CustomerForm />} />
            <Route path="/Customer/view/:id" element={<CustomerView />} />

            <Route path="/Project" element={<ProjectList />} />
            <Route path="/Project/add" element={<ProjectForm />} />
            <Route path="/Project/edit/:id" element={<ProjectForm />} />
            <Route path="/Project/view/:id" element={<ProjectView />} />

            <Route path="/Project/download/" element={<ProjectDownloadingForm />} />

          </Routes>
        </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Customer Management System ©2024</Footer> */}
    </Layout>
  );
}

export default App;
