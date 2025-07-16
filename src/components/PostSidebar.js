import React from 'react';
import { Link } from 'gatsby';
import { SidebarCard, Category} from './BlogSidebar';
import { Tag } from './BlogSidebar';
import { getFormattedDate, slugify } from '../utils/helpers';
//import me from '../../content/images/tania2020small.jpg'

export const PostSidebar = ({ tags = [], date, categories = [], thumbnail }) => {
  const categoryAll = categories?.filter(category => category !== 'Highlight');
  let formtdte = new Date(date);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let monthName = months[formtdte.getMonth()];
  formtdte = monthName + ' ' + formtdte.getDate() + ', ' + formtdte.getFullYear();

  const formattedDate = formtdte;

  return (
    <aside className="post-sidebar">
      <SidebarCard>
        <h2>About me</h2>

        <p>
          Hello and thanks for visiting! My name is Nabendu Maiti, and this is my personal website.
        </p>
        <p>
          I'm a software developer, Design, build hardware and softwares, make them secure. I use
          technical skills whenever get scopes. Often I write articales here about technology
          mostly, sometime on life/travel.
        </p>
      </SidebarCard>

      <SidebarCard>
        <h2>Post Details</h2>
        <ul>
          <li>Published {formattedDate}</li>
        </ul>

        {categoryAll && (
          <div>
            <h2>Category</h2>
            <ul>
              {categoryAll.map(category => {
                return (
                  <li key={category}>
                    <Category to={`/categories/${slugify(category)}`} activeClassName="active">{category}</Category>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <h2>Tags</h2>
        <div className="tag">
          {tags.map(tag => {
            return (
              <Tag key={tag} to={`/tags/${slugify(tag)}`} className="tag" activeClassName="active">
                {tag}
              </Tag>
            );
          })}
        </div>
      </SidebarCard>
    </aside>
  );
};
// </aside>      <div className="post-sidebar-card">
//</aside>        <h2>Newsletter</h2>
//</aside>        <p>
//</aside>          Get updates when I write something new! No spam, I respect your inbox.
//</aside>        </p>
//</aside>        <p>
//</aside>          <a
//</aside>            href=""
//</aside>            target="_blank"
//</aside>            rel="noopener noreferrer"
//</aside>            className="button highlighted"
//</aside>          >
//</aside>            Subscribe to the Newsletter
//</aside>          </a>
//</aside>        </p>
//</aside>      </div>
