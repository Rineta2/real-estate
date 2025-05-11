import type { Metadata } from "next";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Profile | ${params.name}`,
    description: `View profile information for ${params.name}`,
  };
}
