"use client";
import Box from "@/components/Box";
import Title from "@/components/Title";
import { useEffect, useState } from "react";

import Transition from "../transition";
function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-32 pt-32">
      <Title prefix="#" heading="about-me" />
      <div className="flex justify-between">
        <div className="flex flex-col gap-8 w-[50%] text-secondary text-justify">
          <p>
            I am Satyam Dwivedi, a dedicated web programmer based in Birgunj,
            Nepal. My journey in web development began during my studies, where
            I discovered a deep passion for creating digital experiences that
            are not only visually appealing but also functional and intuitive.
          </p>
          <p>
            My primary expertise lies in crafting responsive web applications
            from scratch, utilizing the latest technologies and best practices
            to ensure optimal performance and user experience. Whether it's
            designing elegant user interfaces or implementing robust backend
            functionality, I strive to deliver solutions that meet the unique
            needs of each project.
          </p>
          <p>
            Over the past year, I have honed my skills and expanded my knowledge
            in web development, particularly focusing on modern frameworks such
            as the MERN (MongoDB, Express.js, React.js, Node.js) stack and
            Next.js for server-side rendering. This journey has allowed me to
            transform my creativity and technical prowess into tangible results,
            helping various clients establish their presence online and bring
            their visions to life.
          </p>
          <p>
            What drives me is the opportunity to innovate and create impactful
            solutions that make a difference. I enjoy the challenge of turning
            ideas into reality, collaborating with clients and team members to
            ensure every project meets and exceeds expectations. From concept to
            deployment, I am dedicated to delivering high-quality web
            experiences that engage users and drive results.
          </p>
          <p>
            In addition to my technical skills, I bring a strong sense of
            curiosity, enthusiasm for learning, and a proactive approach to
            problem-solving. I believe in continuous improvement and staying
            updated with industry trends, always seeking new challenges and
            opportunities to grow professionally and personally.
          </p>
          <p>
            As I continue to evolve in my journey as a web programmer, I look
            forward to connecting with like-minded individuals and
            organizations, collaborating on exciting projects, and making a
            meaningful impact in the ever-evolving digital landscape.
          </p>
        </div>
        <img
          src="/Profile.webp"
          alt=""
          className="border-b-2 w-[30rem] h-[28rem]"
        />
      </div>
      <Title prefix="/" heading="skills" />
      <div className="grid grid-cols-3 grid-rows-[(3, 1fr)] gap-5">
        <Box heading="Front eend" description="HTML, CSS, JavaScript, React" />
      </div>
    </main>
  );
}

export default Transition(Page);
