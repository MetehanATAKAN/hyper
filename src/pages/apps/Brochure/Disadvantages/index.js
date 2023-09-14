import React, { useState, useEffect } from 'react'
import Tabs from './Tabs'
import DisadvantagesPage from './Disadvantages';
import PageList from './PageList';
import Templates from './Templates';
import PageGallery from './PageGallery';
import { useSelector } from 'react-redux';

const Disadvantages = () => {
    const [selectedTab, setSelectedTab] = useState('Disadvantages');
    const disadvantageTabName = useSelector((state) => state.Need.disadvantageTabName);

    useEffect(() => {
      setSelectedTab(disadvantageTabName);
    }, [disadvantageTabName]);

  return (
    <div>
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {
            selectedTab === 'Disadvantages' && <DisadvantagesPage setSelectedTab={setSelectedTab} />
        }
        {
            selectedTab === 'Page List' && <PageList setSelectedTab={setSelectedTab} />
        }
        {
            selectedTab === 'Page Gallery' && <PageGallery />
        }
        {
            selectedTab === 'Templates' && <Templates />
        }
    </div>
  )
}

export default Disadvantages