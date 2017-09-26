import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './index.css';



// Main component
class App extends React.Component{
    
    constructor(){
      super();
      
      this.state = {
        usersRecent: [],
        usersAlltime: [],
        currentView : true
      };
    }
    
  
      componentDidMount(){
        
        { this.renderGetData('https://fcctop100.herokuapp.com/api/fccusers/top/recent') }
        { this.renderGetData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')}
  
      }
    
    viewSwap(value){
      if(this.state.currentView !== value){
        this.setState({currentView : value});
      }
    }
   
    renderList(users) {
      var {usersRecent,usersAlltime, currentView} = this.state;
      var rank =1;
      
      return (
        
        <table id="list">
          <thead>
         <tr className="column-header">
            <th>Rank</th>
            <th>Username</th> 
            <th onClick={(event) => this.viewSwap(true)}>Past 30 days points</th>
            <th onClick={(event) => this.viewSwap(false)}>All time points </th>
            </tr>
          </thead>
          <tbody>
        {currentView && (usersRecent.map((user) => 
                  <tr className="Recent"> 
                     
                      <td><div className="portrait"><img src={user.img}  className="user-img"></img><div className="rank">{rank++}</div></div></td>
                                           <td className="username"><a href={ "https://www.freecodecamp.org/"+ user.username} >{user.username}</a></td>
                                           <td ><div className="recent"> {user.recent} pts</div></td>
                     <td ><div className="alltime">{user.alltime} pts</div></td>
                   </tr>
                   
                  ))}
          
          {currentView === false && (usersAlltime.map((user) => 
                  <tr className="Alltime"> 
                     <td><div className="portrait"><img src={user.img}  className="user-img"></img><div className="rank">{rank++}</div></div></td>
                     <td className="username"><a href={ "https://www.freecodecamp.org/"+ user.username}>{user.username}</a></td>
                    <td ><div className="recent">{user.recent} pts</div></td>
                     <td ><div className="alltime">{user.alltime} pts</div></td>
                   </tr>
                    ))}
          </tbody>
      </table>)
    }

	renderGetData(url){
return (
 this.serverRequest = axios
          .get(url)
          .then((result) =>{
             var users = result.data;
             
             this.setState({
              usersRecent : users
             });
        console.log (this.state.usersRecent);
         })
)
}

   render() {
    return (<div className="container">
      <div className="green-circle"></div>
      <div className="blue-circle"></div>
        <div className="red-circle"></div>
        <div className="list">
          <div className="header">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZwogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICB3aWR0aD0iMTk3LjU3OTM2bW0iCiAgaGVpZ2h0PSIxMzYuMjgyOTZtbSIKICB2aWV3Qm94PSIwIDAgNzAwLjA4NDM1IDQ4Mi44OTIzNyI+CiAgPHBhdGgKICAgICBpZD0icGF0aDEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtNTY5LjQ2OTg4KSIKICAgICBzdHlsZT0iZmlsbDojMDAwIgogICAgIGQ9Im0gMTE3LjUxMjkzLDEwNTEuNjMxOCBjIC0xMi4xNDgzNywtMi45MDAyIC0yOS43MjgxNDgsLTE4LjE1MjIgLTQ5LjIyMTg2OCwtNDIuNzA0MiBjIC0zOS41NzA5OTksLTQ5LjgzODkzIC02MS4wNTc0OTk0LC0xMDUuNzM5NTIgLTY3LjM4NDkzOTM3LC0xNzUuMzEyNTMgYyAtMS4yMTc4MiwtMTMuMzkwNiAtMS4yMDU1OSwtNDcuMjY4OSAwLjAyMTYsLTU5LjY2NjMgYyA1Ljc4NTkwOTk3LC01OC40NTI5NiAyNi4yMzk5NTAzNywtMTA4Ljc5MTYyIDYzLjc3MDc5OTM3LC0xNTYuOTQzODkgYyAxMS40OTI5OSwtMTQuNzQ1NTggMzAuNTQwNjIsLTM0LjA2MjY3IDM5LjY2MzQzOCwtNDAuMjI0NTkgYyAxMi45MDgxMiwtOC43MTg2MiAyMS4wMzMyOSwtOS40MjM2MiAyOC44MzAzMiwtMi41MDE0OSBjIDMuMTgwMDEsMi44MjMxOSAzLjkxMTM4LDQuMTM2NTYgNC4zMTg2OCw3Ljc1NTM3IGMgMC43NjY5LDYuODEzNzUgLTIuNzI1ODUsMTIuMTM4MDEgLTE4Ljk2NzQ2LDI4LjkxMzU2IGMgLTIyLjY5Njg5OCwyMy40NDMwNyAtMzMuMTY3ODY4LDM2LjQ5MzA3IC00NC43NjYyODgsNTUuNzkyMzQgYyAtMjYuMzM4MDY5LDQzLjgyNTQzIC0zNy42MDg1NjksODkuOTE0MzQgLTM1Ljk5Mjk3OSwxNDcuMTg3NSBjIDAuODYwNzIsMzAuNTEyOTMgNC4xMjU3NCw1My4wMDQyIDExLjMyNjAxLDc4LjAxOTkxIGMgNi40ODUwNCwyMi41MzA3NSAxNC4yNjg2NCw0MC42OTY4OCAyNS45MjQ5MzksNjAuNTA2MTkgYyAxMS43MDM2OSwxOS44ODk4IDIxLjUzODQ5LDMyLjQ3MzkgNDEuMjA0OTQ4LDUyLjcyMzkzIGMgMTcuMjUzNTEsMTcuNzY1NSAyMS41MzkwOSwyMy45MzU4IDIxLjUzOTA5LDMxLjAxMTggYyAwLDcuMDM5MSAtNC45Njg0MywxMy40MDUzIC0xMS45ODIyNCwxNS4zNTMyIGMgLTMuODc0NTEsMS4wNzYxIC00LjEzODExLDEuMDc4OSAtOC4yODQsMC4wODkgeiBtIDQ1NS40NDA4OSwwLjI2NjUgYyAtMy42NzE5LC0wLjc3OTUgLTEwLjIzODEsLTcuODQxNCAtMTAuOTc4NSwtMTEuODA3MiBjIC0xLjE5MzEsLTYuMzkwNCAyLjYwODcsLTEyLjA4MjEgMjAuMzMyLC0zMC40MzkxIGMgOC43MjE0LC05LjAzMzMgMTkuNDUyNiwtMjAuOTA3MzMgMjMuODQ2OSwtMjYuMzg2ODMgYyAzMi4xNTI0LC00MC4wOTE1NCA1MC4wMTU2LC04NC43MDEyNyA1NC43ODE1LC0xMzYuODA1NTkgYyAxLjQ2OTEsLTE2LjA2MjMyIDAuNzA5NiwtNTcuNDQ4MSAtMS4zMzkxLC03Mi45NjcxNiBjIC00LjI5MTUsLTMyLjUwNjk5IC0xMi4yMTI1LC01OS4xMDEgLTI1LjkzMiwtODcuMDY0ODUgYyAtMTMuMTI4LC0yNi43NTgxOSAtMjYuNzA5OSwtNDUuNzM2NTYgLTQ5LjY0ODUsLTY5LjM3NSBjIC0xNS40MDM3LC0xNS44NzM3MSAtMTkuOTQ0NiwtMjEuNjcwMTcgLTIxLjQ5MywtMjcuNDM1NzcgYyAtMS41MTc3LC01LjY1MTYxIC0wLjQyNjcsLTkuODQ4NCAzLjgxMjIsLTE0LjY2Mzk4IGMgNS44MTQzLC02LjYwNTM4IDEyLjQ1NjEsLTcuMTk0NiAyMi44NTAxLC0yLjAyNzEyIGMgMTIuNTgxNCw2LjI1NDkzIDI4Ljg4NjEsMjIuNTg5MzcgNDcuODEyNSw0Ny44OTk2MiBjIDM4LjA3ODEsNTAuOTIxOTcgNTcuNzE3MSwxMDYuOTQyMTEgNjIuNDM3MiwxNzguMTAyMjUgYyA0LjAxMDQsNjAuNDYxNDQgLTEwLjY1NjgsMTIxLjY2MzMyIC00MS4zMDM4LDE3Mi4zNDgyIGMgLTIxLjE1NDcsMzQuOTg2MjMgLTUzLjQyOTUsNzAuODM2NzMgLTcwLjYxNTUsNzguNDM4ODMgYyAtNC40OTE4LDEuOTg3IC0xMC45MzY3LDIuOTUzNCAtMTQuNTYyLDIuMTgzNyB6IG0gLTM4MC4wODMzNywtMzYuODY3NyBjIC0xMC4yODc0NSwtMy4xMTg0IC0xNi4yNTEzNiwtMTMuNDAwNCAtMTMuNzcwNjUsLTIzLjc0MTEzIGMgMS41MzQwNSwtNi4zOTQ3IDcuOTUzNTEsLTEyLjk2OTMgMTQuMTk4NiwtMTQuNTQxOCBjIDYuMjkxMTgsLTEuNTg0MiAzMzEuNzMyODIsLTEuNTg0MiAzMzguMDI0MDIsMCBjIDYuNDM3NSwxLjYyMDkgMTIuNzYyLDguMjE2NCAxNC4xNjg3LDE0Ljc3NTYgYyAxLjg0MzYsOC41OTYzMyAtMi4wMTk3LDE3LjM5NTAzIC05LjUyNTMsMjEuNjk0MTMgbCAtMy45Njc5LDIuMjcyNyBsIC0xNjguMjgxMjUsMC4xNTkgYyAtOTIuNTU0NjksMC4wODggLTE2OS40MzU0OCwtMC4xOTA5IC0xNzAuODQ2MjIsLTAuNjE4NSB6IG0gMTI4LjE4OTk3LC03OS4xMDkzMSBjIC0zMS4yNTIyNiwtMTEuMzY3MTUgLTU3LjI1NDE0LC0zMy41MTk4OCAtNzAuNTY0NjQsLTYwLjExODcyIGMgLTcuMzk5NzgsLTE0Ljc4NzI0IC0xMS42OTUwNiwtMzIuNjk2OTkgLTExLjY5MTY4LC00OC43NSBjIDAuMDA1LC0yMS43MDI4OSA4LjQ5MTMyLC00Mi4zODM1NiAzNC4zNDY0MSwtODMuNjk2MTIgYyAxOS4yNTc0OCwtMzAuNzcwNTggMjIuNTM4NTYsLTM2LjM3ODA0IDI4LjIwMDksLTQ4LjE5NjEzIGMgNy41MzUxNSwtMTUuNzI2ODcgMTAuMDE5NjIsLTI1LjA2NzY0IDEwLjE3NzUxLC0zOC4yNjQgYyAwLjE1MDg5LC0xMi42MTEzMyAtMS43MzkxLC0yMC4wOTM0NCAtNy41NDc4LC0yOS44ODAyNCBjIC00LjEyMzI5LC02Ljk0NzE0IC0xMy4zOTk0LC0xNy40MDQ0NiAtMTcuMTY2NTYsLTE5LjM1MjUzIGMgLTYuMTM5ODEsLTMuMTc1MDIgLTcuNDEyNDEsLTcuNDg3NjcgLTMuMDUyNDksLTEwLjM0NDQgYyA2Ljg5NTQ0LC00LjUxODA3IDI1LjczNTM1LC0xLjY1MjcyIDQzLjA0NDE2LDYuNTQ2NTQgYyAxOS41ODUwNCw5LjI3NzUyIDM0LjAxOTkzLDIyLjU5ODk2IDQzLjQxOTg2LDQwLjA3MDYxIGMgNy4yNDQ4LDEzLjQ2NTkyIDEwLjE2NTgsMjMuNzg1MDUgMTUuMDc5NjQsNTMuMjcyNTIgYyA1LjQ1Mjg3LDMyLjcyMjExIDEwLjg1ODM4LDQzLjEwMzg4IDIxLjc4OTAyLDQxLjg0Nzc5IGMgNS43OTIxNSwtMC42NjU2MSA5LjQwNjk4LC0yLjg2Mzc2IDExLjg0NjA1LC03LjIwMzQ5IGMgMy44ODUyNCwtNi45MTI4NyAyLjIxOTg2LC0xNi4zNzUxOSAtNS42MzgsLTMyLjAzMzc5IGMgLTYuNDIwMDUsLTEyLjc5MzQ1IC02LjAyMjcsLTE2LjY1OTMxIDEuNTA3NjIsLTE0LjY2Nzg4IGMgMy45MDA0NywxLjAzMTQ5IDE2LjU1NjcsMTEuMzY5MTkgMjUuMzE5MzcsMjAuNjgxMDQgYyAyMS45MjM5MiwyMy4yOTc5NSAzMi44MzUyNCw0NC40NjQ4OCAzOC4wODI0LDczLjg3NjMzIGMgMi43NTIxNiwxNS40MjY0NCAyLjk4MTI2LDQxLjAwNjU3IDAuNDg2OTgsNTQuMzc1IGMgLTMuMTQ2NzUsMTYuODY1NDUgLTkuNTI0MjcsMzIuNzg0NDkgLTE4LjU4ODE2LDQ2LjM5ODI1IGMgLTEwLjEwNjY5LDE1LjE4MDAyIC0zMS4xOTA2OCwzNC4zODYyMSAtNDYuNTE4OTcsNDIuMzc1ODUgYyAtNi45MjIwOSwzLjYwODA1IC05LjMyNDY5LDMuODI2NzggLTEyLjcxNzY5LDEuMTU3ODUgYyAtNC4yMjAyNywtMy4zMTk2NyAtMy4zMjg5NiwtNS42Mjc2NyA2LjAwMDMsLTE1LjUzNzQ5IGMgMTQuMDE2OTcsLTE0Ljg4OTI2IDIxLjE3MzM4LC0yNS40NzM5MiAyNS4zMjUyNywtMzcuNDU3MjggYyA2LjQwNTc4LC0xOC40ODg2NSAzLjIxNzIzLC00NC4yNjQ5MSAtNy41MDc5NiwtNjAuNjk0MjYgYyAtNC40NDIyNSwtNi44MDQ4MyAtMTAuOTUzMzUsLTEyLjgwNTQyIC0xMy44OTQ4NywtMTIuODA1NDIgYyAtMS42MTAzLDAgLTEuMzQzMTMsMi4xMjQ3MiAxLjY0MjQ2LDEzLjA2MTU5IGMgMS4wNDYxNywzLjgzMjMyIDEuOTAyMTIsOC41MTYwMyAxLjkwMjEyLDEwLjQwODI0IGMgMCwxMC4wMDc3OCAtMTQuMTI2MDQsMTcuMjYyNTUgLTI2LjU2OTE0LDEzLjY0NTI1IGMgLTEwLjExMjAxLC0yLjkzOTY1IC0xNC41Njk0MSwtMTIuMTEwMjkgLTEzLjIzMDEyLC0yNy4yMTk2MSBjIDAuNDEzODcsLTQuNjY5MDcgMC43ODQxMSwtMTMuMTUzNTEgMC44MjI3NSwtMTguODU0MyBjIDAuMDY4MiwtMTAuMDUyMDEgLTAuMDI4OSwtMTAuNTYwNTIgLTMuMjEwOTksLTE2LjgzNTk0IGMgLTYuMjAyMiwtMTIuMjMxMiAtMjAuNTQ2NzgsLTI0LjgzMDIzIC0yOC4yNzAzNSwtMjQuODMwMjMgYyAtMy4zMzA3NSwwIC0zLjYwNDY1LDAuMjAxMjkgLTMuNjA0NjUsMi42NDkwOCBjIDAsMS42NDM3OCAwLjkyNDA0LDMuNTExNTggMi40MzQ5OCw0LjkyMTg4IGMgOC4wMDEwNiw3LjQ2ODExIDkuNTA2OTYsMjIuNzcxMiAzLjU3MDI1LDM2LjI4MTMxIGMgLTMuNjY5MjIsOC4zNSAtNy44MDY3NywxMy4wNzkxNSAtMjEuOTM3MjcsMjUuMDczODUgYyAtMTguNTkyNDgsMTUuNzgyMjcgLTI0LjU4MzYyLDIzLjI5NzI0IC0yOC4yOTkwMywzNS40OTY4MiBjIC0xLjcxODcxLDUuNjQzMzkgLTEuODk2MTQsNy45Mzk5MyAtMS40MTI0LDE4LjI4MTI1IGMgMC44MTIxNiwxNy4zNjE3NCA0LjM1MDU1LDI4Ljg3MDM0IDEyLjYyMDY4LDQxLjA0ODY0IGMgNi4zNDk2MSw5LjM1MDIxIDEzLjc4NDU3LDE1LjI4MjQ4IDIzLjg4MjE2LDE5LjA1NTI3IGMgNC44NTYxMiwxLjgxNDQxIDUuMzkwNjMsMi4yODMwNCA1LjM5MDYzLDQuNzI2MjcgYyAwLDIuODMyMTEgLTIuMTUzNTcsNC42OTM2NCAtNS4zMjksNC42MDYzNCBjIC0wLjkzNjI0LC0wLjAyNiAtNS40OTkxMywtMS40Mjc4NCAtMTAuMTM5NzUsLTMuMTE1NzQgeiIvPgo8L3N2Zz4=" width="100px" height="100px" className="logo"></img>
          <h1 className="title">Leader Board</h1></div>
            { this.renderList(this.state.users) }
        </div>
        </div>
      )
    }
  }
  
  
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
      