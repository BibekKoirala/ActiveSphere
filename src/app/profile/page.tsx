"use client";
import Card from "@/components/Card";
import FullScreenLoader from "@/components/FullScreenLoader";
import { Snackbar } from "@/components/SnackBar";
import { app } from "@/FirebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

function ProfilePage() {
  const session = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [progress, setProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({ isVisible: false, message: '', success: false });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session.status === "authenticated") {
      const postsRef = collection(db, "Posts");

      const myPosts = query(
        postsRef,
        where("email", "==", session.data?.user?.email || "")
      );
      getDocs(myPosts).then((val) => {
        const fin: Post[] = [];
        val.forEach((res) => {
          fin.push({ ...res.data(), id: res.id } as Post);
        });
        setPosts(fin);
      });
    }
  }, [session.status]);

  const deleteImageAndDocument = async (imageUrl: string, documentId:string):Promise<void> => {
    const storage = getStorage(); // Get the storage instance
    const db = getFirestore(); // Get the Firestore instance
  setLoading(true)
  setProgress(50)
    // Extract the image file name from the URL
    const fileName = imageUrl?.split('/')?.pop()?.split('?')[0]; // Extract filename (assuming imageUrl is the full download URL)
  
    try {
      // Delete the image from Firebase Storage
      const imageRef = ref(storage, fileName?.replaceAll('%20', ' '))
      await deleteObject(imageRef);
      console.log(`Image ${fileName} deleted successfully from Storage.`);
  
      // Delete the document from Firestore
      await deleteDoc(doc(db, "Posts", documentId)); // Adjust "Posts" to your collection name
      console.log(`Document with ID ${documentId} deleted successfully from Firestore.`);
      setProgress(100)
      
      setPosts(posts.filter(post=> post.id != documentId))
      setSnackbar({ isVisible: true, message: 'Post deleted successfully', success: true });
      setLoading(false)
    } catch (error) {
      console.error("Error deleting image and document:", error);
    }
  };
  

  // const handleCloseModal = () => {
  //   setIsModalOpen(false); // Close the modal
  // };
  // const handleCardClick = (post: Post) => {
  //   setSelectedPost(post); // Set the selected post
  //   setIsModalOpen(true); // Open the modal
  // };
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {loading && <FullScreenLoader progress={progress} />}
      <Snackbar
      success={snackbar.success}
        message={snackbar.message}
        isVisible={snackbar.isVisible}
        onClose={() => setSnackbar({ isVisible: false, message: '', success: true })}
      />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6 border-b-2 pb-5">
          <div className="relative w-24 h-24 overflow-hidden bg-gray-200 rounded-full">
            <img
              src={session.data?.user?.image || ""}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{session.data?.user?.name}</h1>
            <p className="text-gray-600">Welcome to your profile!</p>
          </div>
        </div>
        {/* <h2 className="text-2xl font-semibold mb-4">Your Posts</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          {posts.map((post) => (
            <div key={post.id} onClick={() => null}>
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
                deleteData={deleteImageAndDocument}
                deleteBol={true}
                id={post.id}
              />
            </div>
          ))}
          {
            posts.length ===0 &&  <p className="text-gray-600">You haven&apos;t posted anything yet!</p>
          }
        </div>

        {/* Modal */}
        {/* {isModalOpen && selectedPost && (
      <Modal post={selectedPost} onClose={handleCloseModal} />
    )} */}
      </div>
    </div>
  );
}

export default ProfilePage;
