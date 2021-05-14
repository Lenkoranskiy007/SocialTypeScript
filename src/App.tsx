import './App.css';

import {Route, Link} from "react-router-dom";
import {Header} from './Header/Header'
import {UsersContainer} from "./USers/UsersContainer";
import {Login} from "./Login/Login";
import React  from 'react'
import {compose} from "redux";
import {withRouter, Switch, Redirect, } from "react-router";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {Preloader} from "./logo/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import { Layout, Menu, Breadcrumb, Row, Col, Avatar} from 'antd';
import 'antd/dist/antd.css'

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';



const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const ProfilesContainer = React.lazy(() => import('./Profile/ProfilesContainer'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));


const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfilesContainer)
const SuspenedChatPage = withSuspense(ChatPage)




type AppPropsType = {
    initializeAppTC: () => void
    initialized: boolean
}


class  App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
        
    }
  
    render() {
     if(!this.props.initialized) {
      return  <Preloader/>
     }


      
        return ( <div>
<Layout>
 <Header/>
    {/* <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={20}> 
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><Link to="/developers"> Developers</Link></Menu.Item>
         </Menu>
        </Col>
        <Col span={4}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Col>

      </Row>
      
    </Header> */}
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            // defaultSelectedKeys={['1']}
          
            style={{ height: '100%' }}
          >

            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
              <Menu.Item key="1"> <Link to="/profile"> Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
              
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Programmer">
              <Menu.Item key="5"><Link to='/Developers'>Developers</Link></Menu.Item>
              <Menu.Item key="6"><Link to='/Chat'>Chat</Link></Menu.Item>
              
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
               <Switch>
                    <Route exact path='/' render={( ) => <Redirect to={'/profile'}/>}/>
                    <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <SuspendedProfile/>}/>

                    <Route path='/developers' render={() => <UsersContainer
                    />}/>

                    <Route path='/login' render={() => <Login
                    />}/>

                    <Route path='/chat' render={() => <SuspenedChatPage
                    />}/>
                   
                     <Route path='/chat' render={() => <SuspenedChatPage
                    />}/>
                   

</Switch>
        </Content>
        

      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Created By Farid Gasymzade</Footer>
  </Layout>,

  

        </div>

        
        
            // <div className="App-wrapper">
            //     <HeadersContainer/>
            //     <Navbar/>

            //     <div className='app-wrapper-content'>
            //         <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
            //         <Route path='/profile/:userId?'
            //                render={() => <SuspendedProfile/>}/>

            //         <Route path='/users' render={() => <UsersContainer
            //         />}/>

            //         <Route path='/login' render={() => <Login
            //         />}/>

            //     </div>
            // </div>

        );
    }


}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }

}


export default  compose(withRouter, connect(mapStateToProps, {initializeAppTC}))(App)

