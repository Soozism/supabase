import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import { Tabs } from 'ui'

import { useParams, useStore } from 'hooks'
import Loading from 'components/ui/Loading'
import { AccountLayout } from 'components/layouts'
import { TeamSettings } from 'components/interfaces/Organization'

const OrgTeamSettings: NextPage = () => {
  const { ui } = useStore()
  const { slug } = useParams()
  const router = useRouter()

  return (
    <AccountLayout
      title={ui.selectedOrganization?.name ?? 'Supabase'}
      breadcrumbs={[
        {
          key: `org-settings`,
          label: 'Settings',
        },
      ]}
    >
      {ui.selectedOrganization === undefined && (ui?.permissions ?? []).length === 0 ? (
        <Loading />
      ) : (
        <div className="p-4 pt-0">
          <div className="space-y-3">
            <section className="mt-4">
              <h1 className="text-3xl">
                {ui.selectedOrganization?.name ?? 'Organization'} settings
              </h1>
            </section>
            <nav>
              <Tabs
                size="small"
                type="underlined"
                activeId="team"
                onChange={(id: any) => {
                  if (id !== 'team') router.push(`/org/${slug}/${id}`)
                }}
              >
                <Tabs.Panel id="general" label="General" />
                <Tabs.Panel id="team" label="Team" />
                <Tabs.Panel id="billing" label="Billing" />
                <Tabs.Panel id="invoices" label="Invoices" />
              </Tabs>
            </nav>
          </div>

          <div className="mb-8">
            <TeamSettings />
          </div>
        </div>
      )}
    </AccountLayout>
  )
}

export default observer(OrgTeamSettings)