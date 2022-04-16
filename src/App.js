import './App.css'
import TopInfoSection from './components/TopInfoSection';
import MainSection from './components/MainSection';
const HomeScreen = () => {
  return (
    <>
      <main>
        <section className='w-100'>
          <TopInfoSection />
          <MainSection />
        </section>
      </main>
    </>
  )
}

export default HomeScreen