import  { Route, Switch } from 'react-router-dom';
import Discover from '../components/Discover';
import MultiSearch from '../components/MultiSearch';


export default function Main() {
  return (
    <Switch>
      <Route path="/" exact component={Discover} />
      <Route path="/multisearch" component={MultiSearch} />
      <Route render={ () => {
        return (
          <p>404 - page not found</p>
        )
      }} />
    </Switch>
  )
}