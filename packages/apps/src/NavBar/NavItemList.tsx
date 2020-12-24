import React, { useRef } from 'react';
import chainxLogo from '@polkadot/apps/NavBar/icons/ChainX_logo.svg';
import {Link} from 'react-router-dom';
import {Icon} from '@polkadot/react-components';
import linkOut from '@polkadot/apps/NavBar/icons/Link out.svg';
import {useToggle} from '@polkadot/react-hooks';
import Selector from '@polkadot/apps/NavBar/Selector';

function NavItemList() {
  const [isStakingOpen, toggleStaking, setToggleStaking] = useToggle();
  const [isGovernanceOpen, toggleGovernance, setToggleGovernance] = useToggle();
  const [isDeveloperOpen, toggleDeveloper, setToggleDeveloper] = useToggle();
  const stakingList = useRef([
    {nodeName: '质押概览', link: '/staking'},
    {nodeName: '我的质押', link: '/staking/nomination'},
  ]);
  const governanceList = useRef([
    {nodeName: '民主权利', link: '/democracy/democracy'},
    {nodeName: '议会', link: '/democracy/council'},
    {nodeName: '财政', link: '/democracy/treasury'},
    {nodeName: '技术委员会', link: '/democracy/techcomm'},
    {nodeName: '资产信托', link: '/democracy/trustee'}
  ]);
  const developerList = useRef([
    {nodeName: 'Chain state', link: '/chainstate'},
    {nodeName: 'Extrinsics', link: '/extrinsics'},
    {nodeName: 'RPC calls', link: '/rpc'},
    {nodeName: 'Sign and verify', link: '/signing'}
  ])

  return (
    <div className="left">
      <img src={chainxLogo} alt=""/>
      <ul>
        <li>
          <Link to={'/accounts'}>资产</Link>
        </li>
        <li className='staking' onClick={toggleStaking} >
          投票抵押
          <Icon icon='angle-down' size='1x'/>
          {isStakingOpen && <Selector nodeList={stakingList.current} onMouseLeave={() => setToggleStaking(false)}/>}
        </li>
        <li className='governance' onClick={toggleGovernance}>
          治理
          <Icon icon='angle-down'/>
          {isGovernanceOpen && <Selector nodeList={governanceList.current}  onMouseLeave={() => setToggleGovernance(false)}/>}
        </li>
        <li>
          <Link to='/DEX'>交易</Link>
        </li>
        <li className='linkOutBrowser'>
          <a href="https://scan.chainx.org/" target='_blank'>
            区块浏览器
            <img src={linkOut} alt=""/>
          </a>
        </li>
        <li className='divideLine'/>
        <li className='developer' onClick={toggleDeveloper}>
          开发者
          <Icon icon='angle-down'/>
          {isDeveloperOpen && <Selector nodeList={developerList.current} onMouseLeave={() => setToggleDeveloper(false)}/>}
        </li>
      </ul>
    </div>
  );
}

export default NavItemList;
