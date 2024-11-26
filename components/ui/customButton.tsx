import { Button, Link } from "@nextui-org/react";

export default function CustomButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Button
      radius="lg"
      className="bg-gradient-to-tr text-md from-turquoise to-purple text-primary-foreground shadow-lg"
      as={Link}
      href={link}
      size="lg"
    >
      {text}
    </Button>
  );
}
