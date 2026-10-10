import { useState } from 'react'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { AboutDialog, AppHeader, FULL_HEIGHT, LicensesDialog, StatusBar, StatusItem, StatusSpacer, useMobileLayout, type MenuGroup } from 'pevenmui'
import { app } from './appConfig'
import { useT } from './i18n'
import SettingsDialog from './SettingsDialog'
import type { Settings } from './settings'

/** 今動いている版 */
const BUILD = `${__APP_VERSION__} (${__APP_COMMIT__})`

/** アプリのアイコン（public/icon.svg）。サブパスで配信されても読めるよう BASE_URL から組み立てる */
const AppIcon = ({ size }: { size: number }) => <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width={size} height={size} style={{ display: 'block' }} />

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

/** 画面の組み立て。上のバー（PC はメニューバー、スマホは ⋮）、中身、PC の下のステータスバー */
export default function App(p: { settings: Settings; onSettingsChange: (patch: Partial<Settings>) => void }) {
  const t = useT()
  const mobile = useMobileLayout()
  const [count, setCount] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [licensesOpen, setLicensesOpen] = useState(false)

  const menus: MenuGroup[] = [
    {
      label: t('menu.file'),
      accessKey: 'F',
      entries: [
        { label: t('menu.reset'), disabled: count === 0, onClick: () => setCount(0) },
        { divider: true },
        { label: t('menu.settings'), onClick: () => setSettingsOpen(true) },
      ],
    },
    {
      label: t('menu.view'),
      accessKey: 'V',
      entries: [{ label: t('menu.statusBar'), checked: p.settings.showStatusBar, onClick: () => p.onSettingsChange({ showStatusBar: !p.settings.showStatusBar }) }],
    },
    {
      label: t('menu.help'),
      accessKey: 'H',
      entries: [
        { label: t('menu.guide'), onClick: () => openExternal(app.repository) },
        { label: t('menu.licenses'), onClick: () => setLicensesOpen(true) },
        { label: t('menu.about'), onClick: () => setAboutOpen(true) },
      ],
    },
  ]

  return (
    <Box sx={{ height: FULL_HEIGHT, display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: 'background.default' }}>
      <AppHeader icon={<AppIcon size={16} />} menus={menus} />

      <Stack component="main" spacing={2} sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 3, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Typography variant="h5">{t('main.title', { name: app.name })}</Typography>
        <Typography color="text.secondary">{t('main.count', { count })}</Typography>
        <Button variant="contained" startIcon={<FontAwesomeIcon icon={faHandPointer} />} onClick={() => setCount((c) => c + 1)}>
          {t('main.click')}
        </Button>
        <Typography variant="body2" color="text.secondary">
          {t('main.hint')}
        </Typography>
      </Stack>

      {!mobile && p.settings.showStatusBar && (
        <StatusBar>
          <StatusItem>{t('status.ready')}</StatusItem>
          <StatusSpacer />
          <StatusItem secondary>{BUILD}</StatusItem>
        </StatusBar>
      )}

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} settings={p.settings} onChange={p.onSettingsChange} />
      <LicensesDialog
        open={licensesOpen}
        onClose={() => setLicensesOpen(false)}
        title={t('menu.licenses')}
        entries={[
          { name: app.name, license: 'CC0-1.0', url: app.repository, note: t('licenses.app') },
          { name: 'PevenMUI', license: 'MIT', url: 'https://github.com/PTOM76/pevenmui' },
          { name: 'React', license: 'MIT', url: 'https://react.dev/' },
          { name: 'MUI', license: 'MIT', url: 'https://mui.com/' },
          { name: 'Font Awesome Free', license: 'CC BY 4.0 / MIT', url: 'https://fontawesome.com/' },
          { name: 'Roboto', license: 'OFL-1.1', url: 'https://fonts.google.com/specimen/Roboto' },
        ]}
      />
      <AboutDialog
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        icon={<AppIcon size={56} />}
        rows={[
          [t('about.version'), <span className="selectable">{BUILD}</span>],
          [t('about.author'), app.author],
          [
            'ソースコード',
            <Link className="selectable" href={app.repository} target="_blank" rel="noopener noreferrer">
              {app.repository.replace('https://', '')}
            </Link>,
          ],
        ]}
      />
    </Box>
  )
}
