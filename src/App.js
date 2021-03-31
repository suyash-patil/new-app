import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu } from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined, StockOutlined} from '@ant-design/icons';
import { fetchSources } from './api/api';
import NewsSection from './components/NewsSection'
import News from './components/News'
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    sources: [],
    homePage: true,
    query: '',
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  async componentDidMount() {
    const sources = await fetchSources();

    this.setState({ sources });
  }

  loadNews(query) {
    this.setState({
      homePage: false,
      query: query
    });
  }

  render() {
    return (
      <Layout>
        <Sider className="menu" trigger={null} collapsible collapsed={!this.state.collapsed}>
          <div className="logo"><h2>{!this.state.collapsed ? 'N' : 'News'}</h2></div>
          <Menu  mode="inline" defaultSelectedKeys={['-1']}>
            <Menu.Item onClick={() => this.setState({ homePage: true })} key="-1" icon={<StockOutlined />}>
              Top News
            </Menu.Item>
            {this.state.sources.map((source) =>
              <Menu.Item  onClick={() => this.loadNews(source.name)} key={source.name}>
                {source.name}
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(!this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              paddingRight: 0,
              minHeight: 280,
            }}
          >
          {this.state.homePage === true ? <News /> : <NewsSection category='everything' query={'q=' + this.state.query} topHeading={this.state.query} results='100' />}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;