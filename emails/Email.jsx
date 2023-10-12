import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Img,
  Link,
  Text,
} from "@react-email/components";
const Email = ({subject, body}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto p-4 font-serif">
          <Img
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/sendit-logo.png"
            width="100"
            height="32"
            alt="Sendit Logo"
            className="mx-auto py-2"
          />
          <Container className="mx-auto rounded-lg shadow-lg ">
            <Heading className="font-bold p-2">{subject}</Heading>
            <Text className="p-2">
              {body}
            </Text>
            <Text className="mt-5 p-2">
              You received this email because you part of the sendit family
            </Text>
            <Text className="text-center mx-auto">  <Link
              className="bg-blue-600 text-white py-2 px-4  rounded-lg"
              href="https://senditcourrier.vercel.app/dashboard"
              target="_blank">
              Go to Order
            </Link></Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default Email;
