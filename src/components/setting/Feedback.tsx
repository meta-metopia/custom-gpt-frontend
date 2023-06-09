import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useI18n } from '@/hook/useI18n';

function Feedback() {
  const { t } = useI18n();

  return (
    <a
      className="setting-icon"
      href="https://github.com/youngle316/chatgpt/issues"
      target="_blank"
      rel="noreferrer"
    >
      <EnvelopeIcon className="h-4 w-4" />
      {t('feedback')}
    </a>
  );
}

export default Feedback;
