import '../../css/Admin/Stat.css';

export default function Stat() {
  return (
    <div className='chart'>
      <div className='category'>
          <label for="crit">Criteria:</label>
          <select name="crit" id="crit">
            <option value="Best seller">Best seller</option>
            <option value="Total revenue">Total revenue</option>
            <option value="Sorted revenue">Sorted revenue</option>
            <option value="Profit">Profit</option>
            <option value="Purchases">Purchases</option>
          </select>
          <label for="gametype">Game type:</label>
          <select name="gametype" id="gametype">
            <option value="RPG">RPG</option>
            <option value="Open world">Open world</option>
            <option value="FPS">FPS</option>
            <option value="Soul-like">Soul-like</option>
          </select>
          <label for="reg">Regular Statistic:</label>
          <select name="reg" id="reg">
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
          </select>
          <label for="time">Time:</label>
          <input type="date" id="time" name="time"/>
      </div>
    </div>
  );
}