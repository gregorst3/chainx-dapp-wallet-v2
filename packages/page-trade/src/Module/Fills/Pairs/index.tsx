
import React, { useContext, useEffect, useState } from 'react';
import Wrapper, { Header, SymbolCell } from './Wrapper';
import { Table, TableBody, TableHead, TableRow } from '@chainx/ui';
import HeadCell from '../../components/HeadCell';
import {
  PairPriceAriseCell,
  PairPriceDownCell
} from '../../components/PriceCell';
import { toPrecision } from '../../../components/toPrecision';
// import useFills from '../../../hooks/useFills';
import { useTranslation } from '../../../translate';
import { FillContext } from '../../FillProvider';


export default function (): React.ReactElement {
  // const fills = useFills();
  const { fills } = useContext(FillContext);
  const latest = fills[0]?.price || toPrecision(0, 7);
  const currencies = ['PCX'];
  const precision = 9;
  const showPrecision = 7;
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Header>
        <ul>
          <li className={'active'}>
            {currencies[0]}
          </li>
        </ul>
      </Header>

      <Table>
        <TableHead>
          <TableRow>
            <HeadCell>{t('Token')}</HeadCell>
            <HeadCell style={{ textAlign: 'right' }}>
              {t('Price')}
            </HeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <SymbolCell>{currencies[0]}</SymbolCell>
            {latest && latest.arise ? (
              <PairPriceAriseCell style={{ textAlign: 'right' }}>
                {Number(toPrecision(latest, precision)).toFixed(
                  showPrecision
                )}
              </PairPriceAriseCell>
            ) : (
                <PairPriceDownCell style={{ textAlign: 'right' }}>
                  {Number(toPrecision(latest, precision)).toFixed(
                    showPrecision
                  )}
                </PairPriceDownCell>
              )}
          </TableRow>

        </TableBody>
      </Table>
    </Wrapper>
  );
}
