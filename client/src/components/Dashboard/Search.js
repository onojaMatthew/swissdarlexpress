import React from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { SearchOutlined } from "@ant-design/icons";

const Search = ({
  handleSearch,
  handleKeyPress,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="mb-3">
      <InputGroup>
          <Input
            placeholder="Search by phone number"
            value={searchTerm}
            onChange={( e ) => setSearchTerm( e.target.value )}
            onKeyPress={(e) => handleKeyPress(e)}
            style={{
              border: "none",
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              height: "100%",
              padding: 15,
            }}
          />
          <InputGroupAddon
            addonType="append"
          >
            <Button
              onClick={() => handleSearch()}
              color="secondary"
              style={{
                height: "100%",
                width: "80px",
                borderBottomRightRadius: 26,
                borderTopRightRadius: 26,
                background: "#20a8d8",
                border: "none"
              }}
            >
              <SearchOutlined style={{ color: "#fff"}} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
    </div>
  );
}

export default Search;