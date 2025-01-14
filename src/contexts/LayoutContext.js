import React, { createContext, useState, useEffect, useContext } from "react";
import Link from "next/link";
import SolidColorButton from "@/components/SolidColorButton";
import styles from "@/styles/Navbar.module.css";
import { Image } from "@chakra-ui/react";
import { Button, Box, Center, Img , Text, IconButton, Icon, Flex, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsGithub, BsLinkedin, BsPerson, BsDiscord, BsFillEnvelopeFill } from 'react-icons/bs';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'

const navItems = [
  { path: '/about', title: 'About' },
  { path: '/projects', title: 'Projects' },
  { path: '/membership', title: 'Membership' },
  { path: '/events', title: 'Events' },
  { path: '/resources', title: 'Resources' }
];

const Layout = createContext();

const Navbar = ({ isMobile }) => {

    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <Image
                src="/images/WebsiteAssets/KUBI_Logos/kubi_white_logo.png"
                width="110px"
                alt="KUBI Logo"
                />
            </Link>

            {isMobile ? (
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                as={IconButton}
                                icon={isOpen ? <SmallCloseIcon color="white" boxSize={5}/> : <HamburgerIcon color="white" />}
                                variant='outline'
                                borderWidth={0.5}
                                borderColor='gray.500'
                                _hover={{ bg: 'gray.500'}}
                                _expanded={{ bg: 'gray.500'}}
                            />
                            <MenuList
                                bg='white'
                            >
                                {navItems.map(item => (
                                    <MenuItem key={item.title} as={Link} bg="white" _hover={{ bg: 'gray.400' }} href={item.path}>
                                    {item.title}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </>
                    )}
                </Menu>
            ) : (
            <div className={styles.rightMenu}>
                {navItems.map(item => (
                    <Link key={item.title} href={item.path}>
                    <SolidColorButton title={item.title} />
                    </Link>
                ))}
            </div>
            )}
        </nav>
    );
}

const Footer = ({ isMobile }) => {

    return (
        <footer>
            <Flex py={20} justifyContent="Center" maxWidth="100%">
                <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1 }}>
                <VStack spacing={5}>
                    <Image width="150" height="150" alt="KUBI Logo" src="/images/WebsiteAssets/KUBI_Logos/KU-Blockchain-logo.svg"/>
                    <HStack spacing={5}>
                    <Link href="https://github.com/KU-Blockchain">
                        <IconButton variant='outline' colorScheme='#23406D' aria-label="Github" icon={<BsGithub style={{ color: "#23406D" }} />} />
                    </Link>
                    <Link href="https://www.linkedin.com/company/kublockchain/">
                        <IconButton variant='outline' colorScheme='#23406D' aria-label="Linkedin" icon={<BsLinkedin />} />
                    </Link>
                    <Link href="https://discord.gg/GAznpHUzny">
                        <IconButton variant='outline' colorScheme='#23406D' aria-label="Discord" icon={<BsDiscord />} />
                    </Link>
                    <Link href="mailto:blockchalk@kublockchain.com">
                        <IconButton variant='outline' colorScheme='#23406D' aria-label="Email" icon={<BsFillEnvelopeFill />} />
                    </Link>
                    </HStack>
                    <Text mx={10} align="center">Made with 🔥 by the University of Kansas Blockchain Institute</Text>
                </VStack> 
                </motion.div>
            </Flex>
        </footer>
    );
}

export const LayoutProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 870);
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
    
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    return (
        <Layout.Provider value={isMobile}>
            <Navbar isMobile={isMobile} />

            <Box m="auto" {...isMobile ? {p: 5} : { px: 20, py: 5 }}>
                {children}
            </Box>

            <Footer isMobile={isMobile} />
        </Layout.Provider>
    );
}

export const useLayout = () => useContext(Layout);