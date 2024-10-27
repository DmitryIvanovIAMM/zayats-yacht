import { FC } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

export interface ContactUsProps {
  title: string;
}

const ContactUs: FC<ContactUsProps> = ({}) => {
  return <SectionTitle title="Contuct Us" />;
};

export default ContactUs;
