import { SiGoogledocs } from "react-icons/si";
import Image from 'next/image';
import HomeImage from '../../public/images/Home page Image.png';
import document from '../../public/images/google-docs.png';
import chatImage from '../../public/images/chat.png'
import TodoImage from '../../public/images/done.png'
import NotificationImage from '../../public/images/notification-bell.png'



export default function Home() {
  const docs = [
    {
      title: 'Real time Colab',
      description: 'One or more users can collaborate here. This section allows for easy document sharing and editing and Publish this docs.',
      icons:document
    },
    {
      title: 'Real Time Chating ',
      description: 'Communicate instantly with your team using real-time messaging. Stay connected and collaborate efficiently.',
      icons:chatImage
    },
    {
      title: 'Task Assigning',
      description: 'Easily assign tasks to your team members,track progress, and ensure timely completion with due date and users can add comments.',
      icons:TodoImage
    },
    {
      title: 'Notification',
      description: 'Notification message should been there for each Task Assigning For the user an user redirect to the task assigned page easily',
      icons:NotificationImage
    }
  ];

  return (
    <>
      <div className="bg-indigo-900 max-h-full flex flex-col justify-center items-center text-white text-center p-4">
        <header className="w-full">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">
            Work-Way
          </h1>
          <h3 className="text-lg lg:text-xl font-bold">
            Productivity, reimagined
          </h3>
        </header>

        <div className="mt-4 flex flex-col gap-2 lg:mt-6">
          <h6 className="text-sm lg:text-base">
            Shockingly simple and more powerful than ever before
          </h6>
          <h6 className="text-sm lg:text-base">
            Get started now to experience the future of work.
          </h6>
        </div>

        <div className="flex gap-4 mt-5 flex-wrap justify-center">
          <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-2 px-4 rounded-lg">
            Get Started
          </button>
          <button className="border-violet-700 border-2 text-white font-semibold py-2 px-4 rounded-lg">
            Learn More
          </button>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-[80%] w-[80%] relative my-12 flex justify-center items-center rounded-lg">
          <Image
            className="w-[80%] h-[80%] object-cover -translate-y-8"
            src={HomeImage}
            alt="Example Image"
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-9 my-7">
  {docs.map((doc, index) => (
    <div key={index} className="border-2 border-violet-700 p-6 rounded-lg flex flex-col items-center gap-7 w-full sm:w-[30%] h-auto max-w-[300px]">
      {/* <SiGoogledocs className="text-5xl text-white" /> */}
      <Image 
            src={doc.icons}  // Image source from the docs array
            alt=""   // Alt text for accessibility
            width={70}       // You can adjust width
            height={60}      // You can adjust height
            className="rounded-lg"
          />
      <h3 className="text-xl font-semibold text-white mb-1">{doc.title}</h3>
      <p className="text-white text-sm font-medium text-left">
        {doc.description}
      </p>
    </div>
  ))}
</div>
      </div>
    </>
  );
}
