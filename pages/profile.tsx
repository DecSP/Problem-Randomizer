import Head from 'next/head'
import { Layout } from '@/components/Layout'
import { Avatar } from '@/components/Avatar'
import { useAuthContext } from '@/context/auth'
import { Button } from '@/components/Button'
import { Icon } from '@iconify/react'

const ProfilePage = () => {
  const { user, logout } = useAuthContext()

  return (
    <>
      <Head>
        <title>
          {user ? `${user?.name || user.username}'s ` : ''}Profile | Problem
          Randomizer
        </title>
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          name="description"
        />
      </Head>

      <Layout>
        <main className="pt-[76px] min-h-[524px]">
          <section
            className="bg-gradient-to-r bg-cover bg-center"
            style={{
              backgroundImage: 'url("/images/auth-bg.svg")',
            }}
          >
            <div className="section-container flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 md:gap-12 px-6 md:px-[90px] py-6 md:py-8 max-w-screen">
              <Avatar
                description={!user?.name ? '' : user?.username}
                loading={!user}
                name={user?.name || user?.username}
                size="lg"
                showInfo
              />
              <Button className="text-sm" color="black">
                <Icon icon="carbon:edit" /> Edit profile
              </Button>
            </div>
          </section>

          <div className="section-container flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12 px-6 md:px-[90px] py-6 md:py-[40px] max-w-screen">
            <Button
              className="w-24 text-sm"
              color="danger"
              variant="outline"
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default ProfilePage
