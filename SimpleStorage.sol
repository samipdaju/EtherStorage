// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    uint256 public favoriteNumber;

    function store(uint256 _number) public virtual {
        favoriteNumber = _number;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    struct People {
        uint256 favourite_number;
        string name;
    }
    People public person = People({favourite_number: 25, name: "Samip"});
    People[] public persons;

    function createPerson(
        uint256 _favouriteNumber,
        string memory _name
    ) public {
        persons.push(People(_favouriteNumber, _name));
        nameToFavorite[_name] = _favouriteNumber;
    }

    mapping(string => uint256) public nameToFavorite;
}
