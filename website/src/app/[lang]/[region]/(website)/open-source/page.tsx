import { DefaultPageProps } from '@/app/[lang]/[region]';
import { SiFigma, SiGithub } from '@icons-pack/react-simple-icons';
import { IconType } from '@icons-pack/react-simple-icons/types';
import { Translator } from '@socialincome/shared/src/utils/i18n';
import { BaseContainer, Avatar, AvatarFallback, AvatarImage, Card, Typography } from '@socialincome/ui';
import Link from 'next/link';

type PortraitProps = {
	name: string;
	commits: string;
};

function Contributor({ name, commits }: PortraitProps) {
	return (
		<article className="flex min-w-80 basis-1/5 flex-row items-center justify-between px-3 py-2">
			<Avatar className="max-w-10 basis-1/5">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div className="flex basis-4/5">
				<Typography as="p" size="lg" className="mx-2 self-end">
					{name}
				</Typography>
				<Typography as="span" size="xs" className="mt-2 self-center">
					{commits}
				</Typography>
			</div>
		</article>
	);
}
export default async function Page({ params }: DefaultPageProps) {
	const translator = await Translator.getInstance({
		language: params.lang,
		namespaces: ['website-open-source'],
	});

	const contributors = translator.t('contributors');
	const title = translator.t('metadata')['title'];
	const heading = translator.t('metadata')['heading'];

	return (
		<BaseContainer className="flex flex-col justify-self-start">
			<section className="">
				<Typography as="h1" size="5xl" weight="bold" className="my-10">
					{title}
				</Typography>
				<Typography as="h2" size="2xl" lineHeight="snug" className="mb-16">
					{heading}
				</Typography>
			</section>
			<section className="flex flex-wrap gap-4">
				{Object.keys(contributors).map((key) => {
					const { name, commits, profile_image } = contributors[key];
					return <Contributor name={name} commits={commits} />;
				})}
			</section>
		</BaseContainer>
	);
}
