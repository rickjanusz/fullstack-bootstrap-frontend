import styled from 'styled-components'

const VimeoStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  #courseNav {
    flex: 1;
    min-width: 250px;
  }
  #vimeoPlayer {
    flex: 2;
    min-width: 800px;
    object-fit: fill;
  }

  #vimeoPlayer iframe, #player {
    width: 100%;
    height: 100%;
    min-height: 600px;
    object-fit: fill;
  }

  #courseWrapper {
    max-height: 400px;
    overflow: auto;
  }
  ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    li {
      margin: 0 0 1px 0;
      padding: 0;
    }
    button {
      padding: 5px;
      background-color: var(--primary-main);
      display: block;
      width: 100%;
      color: white;
      border: none;
      border-bottom: px solid white;
      text-align: left;
      height: 40px;
      transition: 0.25s all;
    }
    button:hover {
      background-color: rgb(70, 10, 10);
      color: var(--primary-main);
      text-decoration: none;
    }
    button:hover .moduleNum {
      background-color: var(--primary-main);
      color: white;
      text-decoration: none;
    }
    button:focus {
      outline: none;
    }
    .current {
      background-color: rgb(10, 10, 10);
      color: var(--primary-main);
    }
    .duration {
      float: right;
      margin-right: 5px;
    }
    .moduleNum {
      background-color: white;
      color: var(--primary-main);
      padding: 8px;
      margin-right: 10px;
    }
  }
`

export default VimeoStyles
