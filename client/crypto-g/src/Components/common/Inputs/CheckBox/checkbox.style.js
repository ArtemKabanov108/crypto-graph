import styled from "styled-components";
import {colors} from "../../../../styles-common/common.style";

export const CheckboxNeon = styled.div`
  margin: 3px 10px 0 10px;
  input[type="checkbox"]:checked,
  input[type="checkbox"]:not(:checked),
  input[type="radio"]:checked,
  input[type="radio"]:not(:checked)
  {
    position: absolute;
    left: -9999px;
  }

  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label,
  input[type="radio"]:checked + label,
  input[type="radio"]:not(:checked) + label {
    display: inline-block;
    position: relative;
    padding-left: 22px;
    line-height: 16px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  input[type="checkbox"]:checked + label:before,
  input[type="checkbox"]:not(:checked) + label:before,
  input[type="radio"]:checked + label:before,
  input[type="radio"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 12px;
    height: 12px;
    border: 1px solid #dddddd;
    background-color: ${colors.transparentBackground};
    box-shadow:  0 0 20px rgb(0 255 0), inset 0 0 10px rgb(0 255 0 / 40%);
  }

  input[type="checkbox"]:checked + label:before,
  input[type="checkbox"]:not(:checked) + label:before {
    border-radius: 2px;
  }

  input[type="radio"]:checked + label:before,
  input[type="radio"]:not(:checked) + label:before {
    border-radius: 100%;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after,
  input[type="radio"]:checked + label:after,
  input[type="radio"]:not(:checked) + label:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after {
    left: 2px;
    top: 2px;
    width: 7px;
    height: 5px;
    border-radius: 1px;
    border-left: 3px solid #e145a3;
    border-bottom: 3px solid #e145a3;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type="radio"]:checked + label:after,
  input[type="radio"]:not(:checked) + label:after {
    left: 5px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #e145a3;
  }

  input[type="checkbox"]:not(:checked) + label:after,
  input[type="radio"]:not(:checked) + label:after {
    opacity: 0;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="radio"]:checked + label:after {
    opacity: 1;
  }
`;