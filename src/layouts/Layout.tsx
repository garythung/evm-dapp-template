import Link from "next/link";

import ConnectWalletButton from "~/components/ConnectWalletButton";
import { LINKS } from "~/constants/links";

const FooterLink = ({ text, href }: { text: string; href: string }) => (
  <a
    className="text-blue-700 font-semibold"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {text}
  </a>
);

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-2 justify-between items-center px-4 py-5 border-b-1 border-black gap-y-2 md:gap-x-16 md:grid-cols-1 md:grid-rows-1 md:grid-cols-header md:px-10 md:py-6 md:h-32 md:border-0">
        <div>
          <Link passHref href="/">
            <a className="font-bold text-3xl">my dapp</a>
          </Link>
        </div>
        <div className="row-start-1 col-start-2 justify-self-end md:col-start-3 md:col-end-4 md:col-auto md:row-start-1">
          <ConnectWalletButton />
        </div>
      </div>
      <div className="px-4 grow md:px-10">{children}</div>
      <div className="px-4 md:px-10 pb-8 pt-8 space-x-4">
        <FooterLink text="twitter" href={LINKS.twitter} />
        <FooterLink text="github" href={LINKS.github} />
      </div>
    </div>
  );
};

export default Layout;
