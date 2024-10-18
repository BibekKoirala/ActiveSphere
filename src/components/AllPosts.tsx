"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase/FirebaseConfig'; // Import your Firebase setup
import Card from './Card'; // Import the Card component
import Modal from './Modal';

const db = getFirestore(app);

type Post = {
  id: string;
  date: string;
  dateCreated: string;
  description: string;
  email: string;
  image: string;
  location: string;
  profilepic: string;
  sport: string;
  title: string;
  username: string;
  zipcode: string;
};

const FetchData: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // State to store the selected post
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state



  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'Posts'); // Replace 'posts' with your Firestore collection name
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsList);

    };

    fetchPosts();
  }, []);

  const handleCardClick = (post: Post) => {
    setSelectedPost(post); // Set the selected post
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {posts.map((post) => (
        <div key={post.id} onClick={() => handleCardClick(post)}>
          <Card
            title={post.title}
            username={post.username}
            sport={post.sport}
            date={post.date}
            description={post.description}
            location={post.location}
            image={post.image}
            profilepic={post.profilepic}
            zipcode={post.zipcode}
            email={post.email}
          />
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <Modal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default FetchData;
