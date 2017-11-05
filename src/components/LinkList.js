import React from 'react'
import Link from './Link'
import {
  graphql,
  gql
} from 'react-apollo'

const LinkList = ({ allLinksQuery = {} }) => {
  if (allLinksQuery.loading) {
    return <div>Loading</div>;
  }

  if (allLinksQuery.error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {allLinksQuery.allLinks.map(link => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );  
};

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`

export default graphql(
  ALL_LINKS_QUERY,
  { name: 'allLinksQuery' }
)(LinkList)
