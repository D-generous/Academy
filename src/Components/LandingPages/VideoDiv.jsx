import React from 'react';
import { Link } from 'react-router-dom';

const VideoDiv = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className=' w-5/6 md:w-3/6 bg-light p-5'>
                <div className=' h-52 w-full border-2 border-danger'>
                    <video src='video.mp4' className='w-full h-full' controls></video>
                </div>
                <h1 className='text-center mt-8 text-4xl font-bold'>Welcome to Hope Academy</h1>
                <p className='mx-auto text-center mt-4 text-lg'>
                    At Hope Academy, we recognize and cultivate each student’s strengths and talents, while providing individualized
                    instruction to meet his or her unique learning needs. Our unique approach of embedding therapeutic supports
                    throughout the academic school day allows us to provide students with an environment in which they feel safe to
                    learn, grow, and build positive relationships. Each student at Hope Academy receives individualized instruction
                    aligned with the Connecticut State Standards as well as targeted intervention using specialized methodologies when
                    appropriate. Emphasis is placed on college and career readiness, and the development of executive functioning
                    skills for all students.
                </p>
                <div className="flex justify-center"><Link to='about_us' className='bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 mt-8 rounded-full'>LEARN MORE</Link></div>
            </div>
        </div>
    );
};

export default VideoDiv;
