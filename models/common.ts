import { EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

// ReactNode: string, number, null, undefined => ko dùng để render

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
  requireLogin?: Boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component?: NextPageWithLayout;
  emotionCache?: EmotionCache;
};
