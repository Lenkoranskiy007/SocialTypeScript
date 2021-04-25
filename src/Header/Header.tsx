import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import {selectIsAuth, loginAuth} from '../redux/auth-selector'
import { logoutTC } from '../redux/auth-reducer';
import { Layout, Menu, Button,  Row, Col, Avatar} from 'antd';
import { Link} from "react-router-dom";
import { UserOutlined} from '@ant-design/icons';



export const Header: React.FC = (props) => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const  login =  useSelector(loginAuth)

    const logoutCallback = () => {
        dispatch(logoutTC())
    }


    const { Header} = Layout;

    return   <Header className="header">
    <div className="logo" />
    <Row>
      <Col span={18}> 
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1"><Link to="/developers"> Developers</Link></Menu.Item>
       </Menu>
      </Col>
      
      {isAuth 
        ? <><Col span={1}>
             <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
             </Col>
             <Col span={5}>
               <Button onClick={logoutCallback}>Log out</Button>
             </Col>
          </>
         : <Col span={6}>
           <Button>
           <Link to={'/login'} >Login</Link>
           </Button>
         </Col>
       }
      

    </Row>
    
  </Header>

    // return <header className={classes.header}>

    //             <img src="https://ak.picdn.net/shutterstock/videos/1020730591/thumb/7.jpg" alt=""/>
    //             <div className={classes.loginBlock} >
    //                 {isAuth ? <div>{login} - <button onClick={logoutCallback}>Log out</button></div>
    //                     :<NavLink to={'/login'} >Login</NavLink>
    //                 }
    //             </div>

    // </header>


}