import { Router } from "express";
import { v4 } from "uuid";
const router = Router();
import members from "../models/Members";

const idFilter = (req) => (member) => member.id === parseInt(req.params.id);

// Gets All Member
router.get("/", (req, res) => res.json(members));

// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    res.json(members.filter(idFilter(req)));
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
router.post("/", (req, res) => {

    const newMember = {
        id : v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active', 
    }
//   const newMember = {
//     ...req.body,
//     id: uuid.v4(),
//     status: "active",
//   };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
  // res.redirect('/');
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (idFilter(req)(member)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: "members updated", member });
      }
    });
    // members.forEach((member, i) => {
    //   if (idFilter(req)(member)) {
    //     const updMember = { ...member, ...req.body };
    //     members[i] = updMember;
    //     res.json({ msg: "member updated", updMember });
    //   }
    // });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter((member) => !idFilter(req)(member)),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
});

export default router;
