import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar/NavBar';
import { Footer } from '@/components/Footer/Footer';

import styles from './Landing.module.scss';

const LandingPage = () => {
  return (
    <div className='h-screen bg-slate-100'>
      {/* nav */}
      <header>
        <NavBar />
      </header>

      {/* main content */}
      <main className='pt-40 pb-20'>
        <div className='flex flex-col items-center justify-center'>
          {/* medallion */}
          <div className='mb-4 flex items-center border shadow-sm p-3 bg-amber-100 text-amber-700 rounded-full uppercase font-semibold text-xs'>
            <Medal className='h-6 w-6 mr-2' />1 <sup className='mr-1'>st</sup>
            place app in my heart
          </div>

          {/* hero */}
          <h1
            className={`${styles.title} text-3xl md:text-5xl text-center text-neutral-800 mb-3`}
          >
            Kanban helps you organize your tasks
          </h1>
          <h1
            className={`${styles.title} text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-3 rounded-md w-fit shadow-lg`}
          >
            breezily.
          </h1>

          {/* pitch */}
          <p className='pitch text-sm md:text-base text-neutral-400 my-4 max-w-xs md:max-w-2xl text-center'>
            Kanban brings all your tasks together so you can reach new
            productivity peaks. Keep tasks in order, deadlines on track and
            projects aligned with Kanban.
          </p>

          {/* sign-up */}
          <Button
            size='lg'
            className='mt-4'
          >
            <Link to='/sign-up'>Get Kanban for free</Link>
          </Button>
        </div>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
