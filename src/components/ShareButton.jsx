import { Dialog } from '@headlessui/react'
import parse from "html-react-parser"
import { ShareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { iconClipboard, iconTelegram, iconTwitter, iconWA } from '../assets'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import { PrimaryButton } from '.'
import { get_thumbnail } from '../utils/variable'
import { useConvertLang } from '../Func/GlobalFunction'

const ShareButton = ({ content, pageName }) => {
  const [open, setOpen] = useState(false);

  // Get preloaded state from SSR if available
  const preloadedState = typeof window !== 'undefined' && window.__PRELOADED_STATE__;
  const isSSR = Boolean(preloadedState?.currentArticle);

  // Create shareable URL
  const createShareableUrl = () => {
    if (isSSR) {
      return preloadedState.shareUrl;
    }

    const currentDomain = window.location.origin;
    const id = content?._id || content?.id;
    const title = (content?.judul_artikel || content?.judul || content?.judul_video || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    return `${currentDomain}/content/${pageName}/${id}/${title}`;
  };

  // Create formatted share text
  const createShareText = (platform = 'default') => {
    const judul = content?.judul_artikel || content?.judul || content?.judul_video || "";
    const shareUrl = createShareableUrl();

    let text = `Baca selengkapnya tentang "${judul}" di:${platform === 'telegram' ? ' ' : '\n'}${shareUrl}\n\nTemukan lebih banyak kajian Islam di idrisiyyah.or.id`;

    return text;
  };

  // Share handlers
  const shareHandlers = {
    whatsapp: () => {
      const shareText = createShareText('whatsapp');
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
        "_blank",
        "noopener,noreferrer"
      );
    },
    telegram: () => {
      const shareUrl = createShareableUrl();
      const title = content?.judul_artikel || content?.judul || content?.judul_video || "";
      const shareText = `Baca selengkapnya tentang "${title}"`;

      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        "_blank",
        "noopener,noreferrer"
      );
    },
    twitter: () => {
      const shareText = createShareText('twitter');
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        "_blank",
        "noopener,noreferrer"
      );
    },
    copyLink: async () => {
      try {
        const shareText = createShareText();
        await navigator.clipboard.writeText(shareText);
        toast.success('Tautan Berhasil Disalin 👋!', {
          position: 'bottom-center',
          autoClose: 500,
          hideProgressBar: true,
        });
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error('Gagal menyalin tautan');
      }
    }
  };

  const shareButtons = [
    {
      name: "WhatsApp",
      handler: "whatsapp",
      icon: iconWA
    },
    {
      name: "Twitter",
      handler: "twitter",
      icon: iconTwitter
    },
    {
      name: "Telegram",
      handler: "telegram",
      icon: iconTelegram
    },
    {
      name: "Salin Link",
      handler: "copyLink",
      icon: iconClipboard
    }
  ];

  const base_url = process.env.REACT_APP_BASE_URL;
    // Use SSR content if available, otherwise use prop content
  const displayContent = isSSR ? preloadedState.currentArticle : content;

  return (
    <>
      <PrimaryButton
        event={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500"
      >
        <ShareIcon className='w-4 h-4' />
        Bagikan
      </PrimaryButton>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
              <button onClick={() => setOpen(false)} className='w-full flex justify-end'>
                <XMarkIcon className='w-4' />
              </button>

              <div className="flex flex-col gap-4">
                <Dialog.Title className="text-xl font-semibold text-center text-gray-900">
                  ✨ Bagikan Kajian Sebarkan Kebaikan!
                </Dialog.Title>

                {/* Content Preview */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  {displayContent?.gambar && (
                    <img
                      src={`${get_thumbnail}${Array.isArray(displayContent.gambar) ? displayContent.gambar[0] : displayContent.gambar}`}
                      alt={displayContent?.judul || displayContent?.judul_artikel || displayContent?.judul_video}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-semibold text-lg mb-2">
                    {/* {displayContent?.judul_artikel || displayContent?.judul || displayContent?.judul_video} */}
                    {useConvertLang(displayContent, "title")}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {/* {parse(displayContent?.deskripsi || '')} */}
                    {parse( useConvertLang(displayContent, "deskripsi") || '')}
                  </p>
                </div>

                <p className="text-base text-center font-semibold text-gray-700">
                  Yuk sebarkan ke berbagai platform!
                </p>

                {/* Share Buttons */}
                <div className="flex justify-center gap-3 flex-wrap">
                  {shareButtons.map(({ name, handler, icon }) => (
                    <div key={name} className='w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100'>
                      <button
                        onClick={() => shareHandlers[handler]()}
                        className="w-6 h-6 text-gray min-w-fit rounded-md text-sm font-medium"
                      >
                        <img src={icon} className='w-6 h-6' alt={name} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <ToastContainer transition={Slide} />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
  
};

export default ShareButton;