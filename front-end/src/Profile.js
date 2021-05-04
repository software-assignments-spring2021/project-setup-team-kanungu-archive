import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from './App';
import './Profile.css';
import Nav from './Nav';
import { Container, Row, Col} from 'reactstrap';

import SearchBar from './SearchBar'
import FeedPost from './FeedPost'
import RecipePage from './RecipePage';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Preview from './Preview'
import PostNewRecipe from './PostNewRecipe';


const Avatar = 'https://picsum.photos/200';

const obj = 
{
    "images": [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/id/207/200/300",
        "https://picsum.photos/id/203/200/300"
    ],
    "ingredients": [
        "rice",
        "beans",
        "sauce",
        ""
    ],
    "instructions": [
        "do something",
        "do something else",
        "finally"
    ],
    "comments": [
        {
            "_id": "607efbd3ba150d52c9a5b127",
            "by": {
                "_id": "607c9b35c463426a0e56e31b",
                "username": "chef99"
            },
            "text": "My family hated this recipe",
            "posted": "2020-08-20T04:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "60860d601b6de1900d598287",
            "by": {
                "_id": "607c9b35c463426a0e56e31b",
                "username": "chef99"
            },
            "text": "I hate this stupid recipe!",
            "posted": "2021-04-26T00:46:24.000Z",
            "__v": 0
        },
        {
            "_id": "60860dc61b6de1900d598289",
            "by": {
                "_id": "607c9b35c463426a0e56e31b",
                "username": "chef99"
            },
            "text": "THIS RECIPE IS HORRIBLE",
            "posted": "2021-04-26T00:48:06.000Z",
            "__v": 0
        },
        {
            "_id": "60860e601b6de1900d59828a",
            "by": {
                "_id": "607c9b35c463426a0e56e31b",
                "username": "chef99"
            },
            "text": "THIS RECIPE IS HORRIBLE AND I HATE IT",
            "posted": "2021-04-26T00:50:40.000Z",
            "__v": 0
        }
    ],
    "slug": "empanadas",
    "_id": "607cd8046dced78cc134dffe",
    "author": {
        "posts": [
            "607cd8046dced78cc134dffe",
            "607d7e1832bad543a85f6655",
            "607d804597a960443a2972a0"
        ],
        "followers": [
            0
        ],
        "following": [
            90
        ],
        "likedPosts": [
            "607d7af66349bb11aed3d108"
        ],
        "slug": "chef99",
        "_id": "607c9b35c463426a0e56e31b",
        "username": "chef99",
        "email": "somebody@gmail.com",
        "firstName": "Bob",
        "lastName": "Baker",
        "bio": "World famous chef",
        "profileImage": "https://picsum.photos/id/222/200/300",
        "__v": 2
    },
    "title": "Empanadas",
    "posted": "2020-08-20T04:00:00.000Z",
    "cuisine": "Mexican",
    "difficulty": "advanced",
    "likes": 10,
    "__v": 10
}


//import MyRecipes from './MyRecipes'


//const ProfilePhoto = ()



//var myNewP = document.createElement("p")
//myNewP.innerHTML = "This is a paragraph"

const Article = ( { number, content } ) => {
    return (
        <article>
            <h1>{number}</h1>
            <p>{content}</p>
        </article>
    )
}

/*
function Options(props) {
    return (
        <postContent>
            <p onClick={props.editProfile}>Edit Profile</p>
            <p onClick={props.changePassword}>Change Password</p>
        </postContent>
    )
}

const MyPost = ( { post } ) => {
    return (
        <postContent>
            <p>{post}</p>
        </postContent>
    )
}
*/

const styles = {
    color: "#FF8C00", 
    backgroundColor: "#FF2D00"
}

const Profile=(props)=> {
    console.log(props)
    const [posts,setPosts] = useState(null)
const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        axios({url:`http://localhost:5000/user/607c9b35c463426a0e56e31b/posts`,method:"GET"})
        .then((response) => {
            console.log(response)
            var i, j, resArray=[], chunk = 2;
for (i = 0, j = response.data.posts.length; i < j; i += chunk) {
  resArray.push(response.data.posts.slice(i, i + chunk));
}
console.log(resArray)
            setPosts(resArray)
            
           
            

            
            console.log(response.data)
        
        })
        .catch((err) => {
            console.error(err)
            
            
        })
    
    },[])
    useEffect(()=>{
        if(posts)
        
        setIsLoading(false)
    },[posts])
    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
          setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
        }
      };

      const handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image.raw);
    
        await fetch("YOUR_URL", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: formData
        });
      };
if(isLoading ===false){
    return (
        <div className="projectcss">
        <div className="container">
            <h1>Profile</h1>
            <SearchBar />

            <h5> Good evening, USERNAME!</h5>

            <section>
                <Article number="000" content="Posts"> </Article>
                <Article number="000" content="Followers"> </Article>
                <Article number="000" content="Following"> </Article>
                <Link to="./UploadProfileImg">
                    <input type="image" className = "profileImg" alt="Click to upload profile image" src={Avatar}></input>
                </Link>
            </section>
  
            <optionRow>
               <Link to = {{pathname:"./EditProfile",state:props.user._id}}>
                    <button className="button">Edit Profile</button>
             </Link>
            </optionRow>

           
            <div className = "hi">
                {posts.map((row)=>(
               <div>
                   {row.map(col=>(<Preview recipe ={col}></Preview>))}

                </div>
                  ))}
                  </div>
         
         </div>

           
                    
        </div>
        
    )
}
else{
    return(<div>Loading...</div>)
}
}

export default Profile