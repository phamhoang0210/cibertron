import ReactOnRails from 'react-on-rails'
import SolPromosApp from 'modules/sol/promos/registers/SolPromosApp'
import SolCoursesApp from 'modules/sol/courses/registers/SolCoursesApp'
import SolCombosApp from 'modules/sol/combos/registers/SolCombosApp'
import SolTargetsApp from 'modules/sol/targets/registers/SolTargetsApp'
import SolDiscountsApp from 'modules/sol/discounts/registers/SolDiscountsApp'

ReactOnRails.register({
  SolDiscountsApp,
  SolPromosApp,
  SolCoursesApp,
  SolCombosApp,
  SolTargetsApp,
});
