import ConnectButton from "@/components/layout/ConnectButton";
import { ArrowLeft, PencilRuler, Share2, Unplug, Wallet } from "lucide-react";
import { Exo_2 } from "next/font/google";
import Link from "next/link";

const exo2 = Exo_2({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="my-16 flex grow flex-col justify-center space-y-20 lg:space-y-14">
      <section className="container items-center space-y-10 md:grid md:grid-cols-6 md:space-x-10 md:space-y-0 lg:grid-cols-5">
        <div className="md:col-span-2 lg:col-span-2">
          <div className="grid aspect-video grid-cols-12 grid-rows-1 space-x-2 md:aspect-square lg:aspect-video">
            <span className="col-span-1 rounded bg-emerald-700 transition-colors delay-500 duration-200 hover:bg-green-700 hover:delay-0"></span>
            <span className="col-span-1 rounded bg-emerald-600 transition-colors delay-500 duration-200 hover:bg-green-600 hover:delay-0"></span>
            <span className="col-span-2 rounded bg-emerald-500 transition-colors delay-500 duration-200 hover:bg-green-500 hover:delay-0"></span>
            <span className="col-span-3 rounded bg-emerald-400 transition-colors delay-500 duration-200 hover:bg-green-400 hover:delay-0"></span>
            <span className="col-span-5 rounded bg-emerald-300 transition-colors delay-500 duration-200 hover:bg-green-300 hover:delay-0"></span>
          </div>
        </div>
        <div className="flex flex-col md:col-span-4 lg:col-span-3">
          <h2
            className={`mb-3 text-3xl font-black text-neutral-700 ${exo2.className}`}
          >
            Future of Personal Branding and Payments
          </h2>
          <p className="text-base text-neutral-600">
            Plutus empowers you to take control of your online presence and
            finances like never before. With our decentralized application, you
            can create a personalized page stored securely on the blockchain,
            showcase your information and social links, and seamlessly receive
            payments in AVAX.
          </p>
          <div className="mt-10 flex items-center space-x-5">
            <ConnectButton size="lg" />
            <ArrowLeft className="h-5 w-5 animate-pulse text-emerald-500" />
            <small className="text-neutral-600">Come on! It's free!</small>
          </div>
        </div>
      </section>
      <section className="container">
        <div>
          <ul className="space-y-10 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-16 md:space-y-0 lg:grid-cols-4 lg:gap-0 lg:space-x-8 lg:space-y-0">
            <li className="col-span-1 flex flex-col text-center lg:text-left">
              <div className="flex flex-col items-center gap-4 space-x-2 lg:flex-row">
                <Unplug className="h-8 w-8 text-neutral-500 lg:h-6 lg:w-6" />
                <h4 className="text-lg font-medium lg:text-base">
                  Connect using your Google account
                </h4>
              </div>
              <small className="mt-5 text-base text-neutral-600 lg:mt-2 lg:text-sm">
                <Link
                  href="https://particle.network"
                  className="text-emerald-600 hover:underline"
                >
                  Particle Network
                </Link>
                {
                  " has enabled us to provide you with a seamless login experience."
                }
              </small>
            </li>
            <li className="col-span-1 flex flex-col text-center lg:text-left">
              <div className="flex flex-col items-center gap-4 space-x-2 lg:flex-row">
                <PencilRuler className="h-8 w-8 text-neutral-500 lg:h-6 lg:w-6" />
                <h4 className="text-lg font-medium lg:text-base">
                  Customize Your Page
                </h4>
              </div>
              <small className="mt-5 text-base text-neutral-600 lg:mt-2 lg:text-sm">
                Personalize your page with your bio, social media links,
                portfolio, and more.
              </small>
            </li>
            <li className="col-span-1 flex flex-col text-center lg:text-left">
              <div className="flex flex-col items-center gap-4 space-x-2 lg:flex-row">
                <Share2 className="h-8 w-8 text-neutral-500 lg:h-6 lg:w-6" />
                <h4 className="text-lg font-medium lg:text-base">
                  Share Your Page
                </h4>
              </div>
              <small className="mt-5 text-base text-neutral-600 lg:mt-2 lg:text-sm">
                Easily share your page link across your social media and expand
                your reach.
              </small>
            </li>
            <li className="col-span-1 flex flex-col text-center lg:text-left">
              <div className="flex flex-col items-center gap-4 space-x-2 lg:flex-row">
                <Wallet className="h-8 w-8 text-neutral-500 lg:h-6 lg:w-6" />
                <h4 className="text-lg font-medium lg:text-base">
                  Receive Payments
                </h4>
              </div>
              <small className="mt-5 text-base text-neutral-600 lg:mt-2 lg:text-sm">
                Start accepting payments in AVAX directly on your page from
                clients, fans, or supporters.
              </small>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
