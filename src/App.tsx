/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Book } from './components/Book';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#0A0E10] flex flex-col items-center justify-center">
      <Book />
    </div>
  );
}
