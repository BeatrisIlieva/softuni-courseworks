from project.formula_teams.mercedes_team import MercedesTeam
from project.formula_teams.redbull_team import RedBullTeam


class F1SeasonApp:
    def __init__(self):
        self.red_bull_team = None
        self.mercedes_team = None

    def register_team_for_season(self, team_name: str, budget: int):
        if team_name != "Red Bull" and team_name != "Mercedes":
            raise ValueError("Invalid team name!")

        if team_name == "Red Bull":
            self.red_bull_team = RedBullTeam(budget)
        elif team_name == "Mercedes":
            self.mercedes_team = MercedesTeam(budget)

        return f"{team_name} has joined the new F1 season."

    def new_race_results(self, race_name: str, red_bull_pos: int, mercedes_pos: int):
        if not self.red_bull_team or not self.mercedes_team:
            raise ValueError("Not all teams have registered for the season.")

        red_bull_info = self.red_bull_team.calculate_revenue_after_race(red_bull_pos)
        mercedes_info = self.mercedes_team.calculate_revenue_after_race(mercedes_pos)

        ahead_team = "Red Bull" if red_bull_pos < mercedes_pos else "Mercedes"

        return f"Red Bull: {red_bull_info}. " \
                f"Mercedes: {mercedes_info}. " \
                f"{ahead_team} is ahead at the {race_name} race."