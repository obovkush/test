import React, { useContext, useLayoutEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

import { ButtonGroup, Button } from '@blueprintjs/core';
import Limit from './Limit';

function useWindowSize() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(document.documentElement.scrollWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return width;
}

const Pages = observer(() => {
  const { content } = useContext(Context);
  const [pagesStart, setPagesStart] = useState(0);
  const pagesEnd = Math.ceil(useWindowSize() / 100);

  const pageCount = Math.floor(content.totalCount / content.limit);
  const pages = [];

  const setPagesRange = () => {
    for (
      let i =
        pagesStart > pageCount - pagesEnd ? pageCount - pagesEnd : pagesStart;
      i <
      (pagesStart > pageCount - pagesEnd ? pageCount : pagesStart + pagesEnd);
      i++
    ) {
      pages.push(i + 1);
    }
    return pages;
  };
  setPagesRange();

  const setPages = (currentPage, startPage) => {
    content.setPage(currentPage);
    setPagesStart(startPage);
    setPagesRange();
  };

  return (
    <>
      <div className='content__info'>
        <span>
          Найдено записей: <strong>{content.totalCount}</strong>
        </span>
        <div className='content__info-limit'>
          <span>Показывать на странице:</span>
          <Limit />
        </div>
      </div>

      <ButtonGroup className='content__pagination'>
        <Button
          outlined={true}
          onClick={() => {
            setPages(1, 0);
          }}
        >
          Первая
        </Button>
        <Button
          outlined={true}
          disabled={content.page <= 10 ? true : false}
          icon={'double-chevron-left'}
          onClick={() => {
            if (content.page > 10) {
              setPages(
                content.page - 10,
                content.page - (content.page % 10) - 10
              );
            }
          }}
        ></Button>
        <Button
          outlined={true}
          disabled={content.page === 1 ? true : false}
          icon={'chevron-left'}
          onClick={() => {
            if (content.page > 1) {
              setPages(content.page - 1, content.page - 1);
            }
          }}
        ></Button>

        {pages.map((page) => (
          <Button
            outlined={true}
            key={page}
            active={content.page === page}
            onClick={() => content.setPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          outlined={true}
          disabled={content.page === pageCount ? true : false}
          icon={'chevron-right'}
          onClick={() => {
            if (content.page < pageCount) {
              setPages(content.page + 1, content.page - 1);
            }
          }}
        ></Button>
        <Button
          outlined={true}
          disabled={content.page >= pageCount - 10 ? true : false}
          icon={'double-chevron-right'}
          onClick={() => {
            if (content.page < pageCount) {
              setPages(content.page + 10, content.page - (content.page % 10));
            }
          }}
        ></Button>
        <Button
          outlined={true}
          onClick={() => {
            setPages(pageCount, pageCount - pagesEnd);
          }}
        >
          Последняя
        </Button>
      </ButtonGroup>
    </>
  );
});

export default Pages;
