'use client';
import { signIn } from 'next-auth/react';
import ChatGPTLogo from 'public/assets/chatgpt.svg';
import GoogleLogo from 'public/assets/google.svg';
import GitHubLogo from 'public/assets/github.svg';
import Footer from '@/components/Footer';
import { useI18n } from '@/hook/useI18n';
import { ContainedLoadingButton } from '@/components/buttons/LoadingButton';
import { useCallback, useState } from 'react';
import { PasswordlessAuthenticationService } from '@/service/firebase/webauthn/authentication.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SignIn() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    try {
      const credential = await PasswordlessAuthenticationService.prepareSignin(
        username
      );
      const result = await signIn('credentials', {
        ...credential,
        username,
        redirect: false
      });
      if (result?.error) {
        alert(result.error);
      } else {
        router.push('/');
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }, [username]);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className=" mb-3 border-b border-solid border-[#D9DADC] p-3 md:mb-8 md:pb-4 md:pt-6">
        <div className="flex h-14 items-center justify-center gap-3">
          <ChatGPTLogo className="h-full" />
          <div className="text-2xl font-semibold">{t('chatgpt')}</div>
        </div>
      </div>

      <div className="flex flex-1 justify-center p-4">
        <div className="w-full max-w-[450px]">
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm font-black">{t('login')}</p>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('username')}
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <ContainedLoadingButton
                loading={loading}
                disabled={loading}
                onClick={handleSignIn}
              >
                {t('signin')}
              </ContainedLoadingButton>
              <Link
                href={'/signup'}
                className="text-blue-500 focus:text-purple-600 underline"
              >
                {t('switch-to-signup')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center gap-3 px-3 pt-2 pb-3 text-center text-xs text-black/50 
      md:px-4 md:pt-3 md:pb-6"
      >
        <Footer />
      </div>
    </div>
  );
}

export default SignIn;
