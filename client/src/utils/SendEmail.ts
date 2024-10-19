import emailjs from "@emailjs/browser";

export const SendEmail = async (email: string, name: string, subject: string, message: string) => {
  const templateParams = {
    to_email: email,
    to_name: name,
    from_email: "kbuicuong@gmail.com",
    from_name: "Tony",
    subject: subject,
    message: message,
  };

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  await emailjs.send(serviceId, templateId, templateParams, userId);
};
