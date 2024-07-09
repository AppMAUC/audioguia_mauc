import React from 'react'
import useExpositions from '../../hooks/useExpositions';
import Card from '../../components/data_display/Cards';

const Expositions = () => {

  const { expositions, loading } = useExpositions();

  return (
    <div>
      {expositions?.length > 0 &&
        expositions.map((item) => (
          <Card link={`/expositions/${item._id}`} key={item._id}>
            <Card.Title>
              {item.title}
            </Card.Title>
            <Card.Description>
              {item.description}
            </Card.Description>
          </Card>
        ))
      }
    </div>
  )
}

export default Expositions;