import Title from "@/components/Title";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Contact() {
  function sendMail() {
    const myHeaders = new Headers();
    myHeaders.append("secret", "sikret-key");
    myHeaders.append("Content-Type", "application/json");
    const email = document.querySelector("input[type=email]").value;
    const name = document.querySelector("input[type=text]").value;
    const raw = JSON.stringify({
      name: name,
      to: email,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://portfolio-api-tan.vercel.app/sendmail", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  return (
    <section id="contacts">
      <Title prefix="#" heading="contacts" />
      <div className="flex flex-col gap-16">
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
        <div className="w-[50%] m-auto p-3 flex flex-col justify-center items-center gap-4 border">
          <h1>Contact Me</h1>
          <input
            className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Enter your name"
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="email"
            placeholder="Enter your email"
          />
          <button
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-theme"
            type="submit"
            onClick={sendMail}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
