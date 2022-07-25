import React from 'react';
import Header from '../components/Header.jsx';
import PostBox from '../components/PostBox.jsx';
import WriteSome from '../components/WriteSome.jsx';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <WriteSome />
      <PostBox />
    </div>
  );
};

export default Dashboard;
