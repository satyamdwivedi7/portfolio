import Title from "@/components/Title";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Contact(){
    return (
      <section id="contacts">
        <Title prefix="#" heading="contacts" />
        <div className="flex justify-between">
          <p className="w-[50%]">
            I'm interested in freelance opportunities. However, if you have
            other request or question, don't hesitate to contact me
          </p>
          <div className="flex flex-col w-[fit-content] border border-1 p-2">
            <div className="">
              <div className="flex flex-col">
                <h1 className="p-2">Message me here</h1>
                <a
                  href="https://www.linkedin.com/in/satyam-dwivedi-66434719a/"
                  target="_blank"
                  className="flex justify-center items-center hover:text-primary"
                >
                  <FaLinkedin />
                  <p className="text-secondary p-2 w-44">Linkedin</p>
                </a>
                <a
                  href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzCpZjfVrPXXJHWZzTHLPKVjkQdTwbChnzxVjVzpWqWFSCtbkpBGzqkCklSCDNJkvfxXpDz"
                  target="_blank"
                  className="flex justify-center items-center hover:text-primary"
                >
                  <MdEmail />
                  <p className="text-secondary p-2 w-44">Email</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}